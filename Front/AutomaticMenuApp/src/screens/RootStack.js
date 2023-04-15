import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';
import WelcomeScreen from './WelcomeScreen';
import PersonalDataScreen from './PersonalDataScreen';
import PreferencesScreen from './PreferencesScreen';
import HomeTabScreen from './HomeTabScreen';

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
                <Stack.Screen name="LogIn" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
                <Stack.Screen name="Home" component={HomeTabScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack