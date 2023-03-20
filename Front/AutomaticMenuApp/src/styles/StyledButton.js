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
    widthBig: {
      width: 140
    },
    widthMid: {
      width: 110
    },
    widthLittle: {
      width: 80
    },
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
    }
  })
  
const StyledButton = ({style={}, standard, login, signup, back, widthBig, widthMid, 
  widthLittle, userStats, rightIcon, welcome, link, ...props}) => {
  const buttonStyles = [
    standard && styles.standard,
    login && styles.login,
    signup && styles.signup,
    back && styles.back,
    widthLittle && styles.widthLittle,
    widthMid && styles.widthMid,
    widthBig && styles.widthBig,
    userStats && styles.userStats,
    rightIcon && styles.rightIcon,
    welcome && styles.welcome,
    link && styles.link,
    style
  ]
  return <TouchableOpacity style={buttonStyles} {...props}/>
}

export default StyledButton