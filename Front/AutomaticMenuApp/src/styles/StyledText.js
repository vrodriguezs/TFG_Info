import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: colors.text
    },
    button: {
        fontSize: 20,
        color: colors.primary
    },
    bold: {
        fontWeight: 'bold'
    },
    small: {
        fontSize: 16,
    },
    color: {
        color: colors.action
    },
    colorlight: {
        color: colors.actionLight
    },
    error: {
        fontSize: 18,
        marginTop: -10,
        color: colors.error
    },
    label: {
        textAlign: 'left',
        paddingBottom: 10
    },
    welcome: {
        textAlign: 'right',
        paddingBottom: 10
    }
})
  
export default function StyledTextInput ({children, button, bold, small, color, colorlight, error, label, welcome}) {
  const textStyles = [
    styles.text,
    button && styles.button,
    bold && styles.bold,
    small && styles.small,
    color && styles.color,
    colorlight && styles.colorlight,
    error && styles.error,
    label && styles.label,
    welcome && styles.welcome,
  ]
  return (
    <Text style={textStyles}>
        {children}
    </Text>
  )
}