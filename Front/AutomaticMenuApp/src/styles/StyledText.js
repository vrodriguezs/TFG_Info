import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: colors.text
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
    error: {
        color: colors.error,
        fontSize: 14,
        marginTop: -19
    },
    appName: {
        fontSize: 40,
        color: colors.action,
        alignSelf: 'center',
        marginBottom: 20
    },
    label: {
        textAlign: 'left',
        paddingBottom: 10
    },
})
  
export default function StyledTextInput ({children, bold, small, color, error, appName, 
    label}) {
  const textStyles = [
    styles.text,
    bold && styles.bold,
    small && styles.small,
    color && styles.color,
    error && styles.error,
    appName && styles.appName,
    label && styles.label,
  ]
  return (
    <Text style={textStyles}>
        {children}
    </Text>
  )
}