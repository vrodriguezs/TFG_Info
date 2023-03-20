import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    flex: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.primary
    },
    screenContainer: {
      flex: 1,
      padding: 35,
      backgroundColor: colors.primary
    },
    screenAppContainer: {
      flex: 1,
      padding: 35,
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    newAccount: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center'
    },
    userStatsLogin: {
      paddingTop: 5,
      paddingBottom: 30
    },
    userStats: {
      paddingTop: 30
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    width50: {
      width: '50%'
    },
    leftIcon: {
      left: 15,
      top: 60,
      position: 'absolute',
      zIndex: 1
    },
    welcome: {
      paddingTop: 40,
      paddingBottom: 100,
      alignItems: 'flex-end',
      alignSelf: 'flex-end'
    },
    row: {
      flexDirection: 'row',
    }
})

const StyledContainer = ({style={}, flex, screenContainer, screenAppContainer, innerContainer, 
  newAccount, userStatsLogin, userStats, flexRow, width50, leftIcon, welcome, row, ...props}) => {
  const containerStyles = [
    flex && styles.flex,
    screenContainer && styles.screenContainer,
    screenAppContainer && styles.screenAppContainer,
    innerContainer && styles.innerContainer,
    newAccount && styles.newAccount,
    userStatsLogin && styles.userStatsLogin,
    userStats && styles.userStats,
    flexRow && styles.flexRow,
    width50 && styles.width50,
    leftIcon && styles.leftIcon,
    welcome && styles.welcome,
    row && styles.row,
    style
  ]
  return <View style={containerStyles} {...props}/>
}

export default StyledContainer