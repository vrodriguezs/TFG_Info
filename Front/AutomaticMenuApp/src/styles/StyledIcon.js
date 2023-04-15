import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    logo: {
      width: 777/3,
      height: 713/3,
      marginVertical: 25,
      alignSelf: 'center'
    },
    logoWelcome: {
      width: 777/3,
      height: 713/3,
      alignSelf: 'center'
    },
    buttonIcon: {
      width: 40,
      height: 40,
      bottom: 60,
      left: 60,
      marginBottom: -40,
      opacity: 0.5
    },
    buttonIconPreferences: {
      width: 40,
      height: 40,
      marginVertical: 5
    },
    iconMenu: {
      width: 25,
      height: 25,
      marginHorizontal: 3
    }
})
  
const StyledIcon = ({style={}, logo, logoWelcome, buttonIcon, buttonIconPreferences, iconMenu, ...props}) => {
  const icon = [
    logo && styles.logo,
    logoWelcome && styles.logoWelcome,
    buttonIcon && styles.buttonIcon,
    buttonIconPreferences && styles.buttonIconPreferences,
    iconMenu && styles.iconMenu,
    style
  ]
  return <Image style={icon} {...props}/>
}

export default StyledIcon