import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    standard: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      padding: 15
    },
    login: {
      backgroundColor: colors.action,
      borderColor: colors.action,
      width: '100%',
      borderRadius: 15,
      marginTop: 40,
      alignSelf: 'center',
      alignItems: 'center',
    },
    back: {
      width: 30,
      height: 30,
      justifyContent: 'flex-start',
      alignContent: 'center',
      marginBottom: -30,
      marginLeft: -20,
    },
    userStats: {
      borderWidth: 2,
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
    }
  })
  
const StyledButton = ({style={}, standard, login, back, widthBig, widthMid, widthLittle, userStats, ...props}) => {
  const buttonStyles = [
    standard && styles.standard,
    login && styles.login,
    back && styles.back,
    widthLittle && styles.widthLittle,
    widthMid && styles.widthMid,
    widthBig && styles.widthBig,
    userStats && styles.userStats,
    style
  ]
  return <TouchableOpacity style={buttonStyles} {...props}/>
}

export default StyledButton