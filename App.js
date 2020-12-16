import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scan from './src/pages/Scan';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer initialRouteName="Scan">
            <Stack.Navigator>
                <Stack.Screen name="Scan" component={Scan} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
