import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Scan from './src/pages/Scan';
import Create from './src/pages/Create';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer initialRouteName="Home">
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                    name="Scan"
                    component={Scan}
                    options={{ headerLeft: false }}
                />
                <Stack.Screen name="Create" component={Create} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
