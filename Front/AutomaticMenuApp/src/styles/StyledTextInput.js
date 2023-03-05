import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    textInput: {
      fontSize: 20,
      paddingHorizontal: 50,
      paddingVertical: 15,
    },
    errorContainer: {
      borderColor: colors.error
    },
    textInputBox: {
      backgroundColor: colors.secondary,
      borderWidth: 0.5,
      borderRadius: 15,
      borderColor: colors.secondary
    },
    textInputLine: {
      paddingHorizontal: -50,
      borderBottomWidth: 4,
      borderBottomColor: colors.secondary
    }
})
  
const StyledTextInput = ({style={}, textInput, errorContainer, textInputBox, textInputLine, ...props}) => {
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