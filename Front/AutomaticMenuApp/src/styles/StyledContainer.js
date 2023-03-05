import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: 35,
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    screenAppContainer: {
      flex: 1,
      padding: 35,
      justifyContent: 'center',
      backgroundColor: colors.secondary
    },
    innerContainer: {
      flex: 1,
    },
    newAccount: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center'
    },
    userStatsLogin: {
      paddingTop: 5,
      paddingBottom: 30,
    },
    userStats: {
      paddingTop: 30
    }
})

const StyledContainer = ({style={}, screenContainer, screenAppContainer, innerContainer, 
  newAccount, userStatsLogin, userStats, ...props}) => {
  const containerStyles = [
    screenContainer && styles.screenContainer,
    screenAppContainer && styles.screenAppContainer,
    innerContainer && styles.innerContainer,
    newAccount && styles.newAccount,
    userStatsLogin && styles.userStatsLogin,
    userStats && styles.userStats,
    style
  ]
  return <View style={containerStyles} {...props}/>
}

export default StyledContainer