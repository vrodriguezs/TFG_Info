import { StyleSheet } from 'react-native'
import { colors } from '../../Colors'

export const styledDropdownStyles = StyleSheet.create({
    standard: {
      padding: 15,
      margin: 10,
      backgroundColor: colors.secondary,
      borderWidth: 3,
      borderRadius: 15,
      borderColor: colors.secondary
    },
    age: {
      width: 130,
    },
    weight: {
      width: 150,
    },
    placeholderStyle: {
      fontSize: 16,
      color: colors.text
    },
    selectedTextStyle: {
      fontSize: 16,
      color: colors.text
    },
    textStyle: {
      fontSize: 16,
      color: colors.text,
      padding: 5,
      paddingLeft: 15
    }
})