import { StyleSheet } from 'react-native'
import { colors } from '../../Colors'

export const StyledShadow = StyleSheet.create({
    shadow: {
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    }
})