import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    standard: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
  
const StyledTextLink = ({style={}, standard, ...props}) => {
  const textLinkStyles = [
    styles.standard,
    style
  ]
  return <TouchableOpacity style={textLinkStyles} {...props}/>
}

export default StyledTextLink