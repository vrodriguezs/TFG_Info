import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import PreferencesScreen from './PreferencesScreen';

import HomeTabScreen from './HomeTabScreen';
import SignUpScreen from './SignupScreen';

const Stack = createNativeStackNavigator()

function RootStack () {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    statusBarTranslucent: true,
                    navigationBarHidden: true,
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
                <Stack.Screen name="Home" component={HomeTabScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack