import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    standard: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      padding: 15
    },
    login: {
      backgroundColor: colors.action,
      borderColor: colors.action,
      width: '100%',
      borderRadius: 15,
      marginTop: 40,
    },
    signup: {
      backgroundColor: colors.action,
      borderColor: colors.action,
      width: '100%',
      borderRadius: 15,
      marginTop: 10,
    },
    back: {
      width: 50,
      height: 50,
      justifyContent: 'flex-start',
      alignContent: 'center',
      left: -20,
      marginBottom: 0
    },
    userStats: {
      borderWidth: 3,
      backgroundColor: colors.secondary,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      margin: 10
    },
    userPreferences: {
      borderWidth: 3,
      backgroundColor: colors.secondary,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      margin: 10
    },
    widthBig: {
      width: 140
    },
    widthSmall: {
      width: 88
    }, //no s'usa
    rightIcon: {
      right: 15,
      top: 60,
      position: 'absolute',
      zIndex: 1
    },
    welcome: {
      borderWidth: 0,
      borderBottomWidth: 3,
      borderBottomColor: colors.action,
      alignSelf: 'flex-end',
    },
    link: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    padding: {
      paddingLeft: 20
    },
    alignRight: {
      alignItems: 'flex-end'
    },
    prevDay: {
      paddingLeft: 40
    },
    nextDay: {
      paddingRight: 40
    }
  })
  
const StyledButton = ({style={}, standard, login, signup, back, widthBig, 
  widthSmall, userStats, userPreferences, rightIcon, welcome, link, padding, alignRight, prevDay,
  nextDay, ...props}) => {
  const buttonStyles = [
    standard && styles.standard,
    login && styles.login,
    signup && styles.signup,
    back && styles.back,
    widthBig && styles.widthBig,
    widthSmall && styles.widthSmall,
    userStats && styles.userStats,
    userPreferences && styles.userPreferences,
    rightIcon && styles.rightIcon,
    welcome && styles.welcome,
    link && styles.link,
    padding && styles.padding,
    alignRight && styles.alignRight,
    prevDay && styles.prevDay,
    nextDay && styles.nextDay,
    style
  ]
  return <TouchableOpacity style={buttonStyles} {...props}/>
}

export default StyledButton