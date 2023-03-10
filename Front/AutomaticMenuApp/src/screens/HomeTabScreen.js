import React from 'react'
import { Image, View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import RecipesScreen from './RecipesScreen';

import { colors } from '../../Colors'

import { StyledShadow } from '../styles/StyledShadow';

import { Ionicons, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function HomeTabScreen() {
    return (
        <Tab.Navigator
            screenOptions = {{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    backgroundColor: colors.primary,
                    borderRadius: 15,
                    height: 70,
                    ...StyledShadow.shadow
                }
            }}
        >
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <Octicons name="person" size={focused ? 30 : 24}
                            style={{
                                color: focused ? colors.action : colors.text
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Menu" 
                component={MenuScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <Octicons name="calendar" size={focused ? 30 : 24}
                            style={{
                                color: focused ? colors.action : colors.text
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Recipes" 
                component={RecipesScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <Octicons name= "book" size={focused ? 30 : 24}
                            style={{
                                color: focused ? colors.action : colors.text
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeTabScreen