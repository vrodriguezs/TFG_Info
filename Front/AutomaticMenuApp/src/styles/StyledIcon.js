import React from 'react'
import { StyleSheet, Image } from 'react-native'

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
    }
})
  
const StyledIcon = ({style={}, logo, logoWelcome,...props}) => {
  const icon = [
    logo && styles.logo,
    logoWelcome && styles.logoWelcome,
    style
  ]
  return <Image style={icon} {...props}/>
}

export default StyledIcon