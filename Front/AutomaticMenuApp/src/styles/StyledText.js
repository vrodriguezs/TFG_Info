import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.text
    },
    button: {
        fontSize: 20,
        color: colors.primary
    },
    bold: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 14,
    },
    big: {
        fontSize: 22,
    },
    tittle: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20
    },
    tittleDay: {
        fontSize: 28,
        marginVertical: 20,
        marginTop: 40
    },
    color: {
        color: colors.action
    },
    colorlight: {
        color: colors.actionLight
    },
    colorPlaceholder: {
        color: colors.textPlaceholder
    },
    error: {
        fontSize: 16,
        marginTop: -10,
        color: colors.error
    },
    label: {
        textAlign: 'left',
        paddingBottom: 10,
        fontSize: 20
    },
    welcome: {
        textAlign: 'right',
        paddingBottom: 10,
        fontSize: 20
    },
    getStarted: {
        paddingBottom: 0,
        fontSize: 20
    },
    flex: {
        flex: 1
    },
    alignRight: {
        textAlign: 'right',
    },
    center: {
        alignSelf: 'center'
    },
    margin: {
        marginHorizontal: 5
    },
})
  
export default function StyledTextInput ({children, button, bold, small, big, tittle, tittleDay, color, 
    colorlight, colorPlaceholder ,error, label, welcome, flex, alignRight, center, margin,
    getStarted}) {
  const textStyles = [
    styles.text,
    button && styles.button,
    bold && styles.bold,
    small && styles.small,
    big && styles.big,
    tittle && styles.tittle,
    tittleDay && styles.tittleDay,
    color && styles.color,
    colorlight && styles.colorlight,
    colorPlaceholder && styles.colorPlaceholder,
    error && styles.error,
    label && styles.label,
    welcome && styles.welcome,
    flex && styles.flex,
    alignRight && styles.alignRight,
    center && styles.center,
    margin && styles.margin,
    getStarted && styles.getStarted,
  ]
  return (
    <Text style={textStyles}>
        {children}
    </Text>
  )
}