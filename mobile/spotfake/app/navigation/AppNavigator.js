
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import AlbumDetails from '../screens/AlbumDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AlbumDetails" component={AlbumDetails} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Playlists" component={Playlists} />
                <Stack.Screen name="PlaybackHistory" component={PlaybackHistory} />
                <Stack.Screen name="PlaylistDetails" component={PlaylistDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
