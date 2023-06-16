import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import RecipesScreen from './RecipesScreen';

import { colors } from '../../Colors'

import { StyledShadow } from '../styles/StyledShadow';

import { Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function HomeTabScreen() {
    return (
        <Tab.Navigator
            initialRouteName='Menu'
            screenOptions = {{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    backgroundColor: colors.secondary,
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
                                color: focused ? colors.actionLight : colors.text
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
                                color: focused ? colors.actionLight : colors.text
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
                                color: focused ? colors.actionLight : colors.text
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeTabScreen