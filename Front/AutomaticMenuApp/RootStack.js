import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';

import HomeTabScreen from './src/screens/HomeTabScreen';

const Stack = createNativeStackNavigator()

function RootStack () {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
                <Stack.Screen name="Home" component={HomeTabScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack