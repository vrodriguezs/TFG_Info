import React from 'react'
import { StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop: 40
    },
    back: {
      width: 30,
      height: 30
    },
})
  
const StyledIcon = ({style={}, logo, back, ...props}) => {
  const icon = [
    logo && styles.logo,
    back && styles.back,
    style
  ]
  return <Image style={icon} {...props}/>
}

export default StyledIcon