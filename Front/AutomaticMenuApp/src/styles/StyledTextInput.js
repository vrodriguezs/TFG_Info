import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    textInput: {
      fontSize: 16,
      paddingHorizontal: 50,
      paddingVertical: 15,
    },
    errorContainer: {
      borderColor: colors.error
    },
    textInputBox: {
      backgroundColor: colors.secondary,
      color: colors.text,
      padding: 15,
      paddingHorizontal: 55,
      borderRadius: 5,
      fontSize: 16,
      height: 60,
      marginVertical: 3,
      marginBottom: 10
    },
    textInputBoxSignUp: {
      backgroundColor: colors.secondary,
      color: colors.text,
      padding: 15,
      paddingHorizontal: 55,
      borderRadius: 5,
      fontSize: 16,
      height: 60,
      marginVertical: 3,
      marginBottom: 5
    },
    textInputLine: {
      paddingHorizontal: -50,
      paddingBottom: 0,
      borderBottomWidth: 3,
      borderBottomColor: colors.secondary,
      color: colors.text
    },
})
  
const StyledTextInput = ({style={}, textInput, errorContainer, textInputBox, 
  textInputLine, ...props}) => {
  const textInputStyles = [
    styles.textInput,
    errorContainer && styles.errorContainer,
    textInputLine && styles.textInputLine,
    textInputBox && styles.textInputBox,
    style
  ]
  return <TextInput style={textInputStyles} {...props}/>
}

export default StyledTextInput