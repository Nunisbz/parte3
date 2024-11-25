import Express from "express";
import { criarTabelas } from "./db.js";
import cors from "cors"
import { rotas } from './roteamento/rotas_autenticacao.js'
import { rotas_users } from './roteamento/rotas_usuarios.js'
import { rotas_artistas } from './roteamento/rotas_artista.js'
import { rotas_albums } from "./roteamento/rotas_album.js";

const app = Express()
app.use(Express.json())
app.use(cors())
// criarTabelas()

app.use('/autenticacao', rotas)
app.use('/user', rotas_users)
app.use('/artista', rotas_artistas)
app.use('/album', rotas_albums)


app.listen(8000)
// Import new routes
import artistsRoutes from './roteamento/artists.js';
import albumsRoutes from './roteamento/albums.js';
import songsRoutes from './roteamento/songs.js';

// Use the routes

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);

import playlistsRoutes from './roteamento/playlists.js';
app.use('/playlists', playlistsRoutes);

import recommendationsRoutes from './roteamento/recommendations.js';
app.use('/recommendations', recommendationsRoutes);

const searchRoutes = require('./roteamento/search');
app.use('/search', searchRoutes);

import authRoutes from './roteamento/auth.js';
app.use('/auth', authRoutes);
