import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
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
      backgroundColor: colors.primary,
    },
    screenMenuContainer: {
      flex: 1,
      padding: 25,
      paddingBottom: 100
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
      paddingTop: 30,
      paddingBottom: 15
    },
    userStatsProfile: {
      paddingVertical: 10
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    width50: {
      width: '50%'
    },
    width60: {
      width: '60%'
    },
    leftIcon: {
      left: 15,
      top: 60,
      position: 'absolute',
      zIndex: 1
    },
    leftIconSearch: {
      left: 40,
      top: 140,
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
      alignItems: 'center'
    },
    rowTop: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    spaceBetween: {
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    spaceAround: {
      justifyContent: 'space-around',
      flexWrap: 'wrap'
    },
    flexStart: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    },
    underline: {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: colors.divider,
    },
    underlineMeal: {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: colors.textPlaceholder,
      paddingBottom: 10,
      alignSelf: 'center',
      width: '97%'
    },
    page: {
      flexDirection: 'row',
      width: Dimensions.get('screen').width
    },
    meal: {
      borderRadius: 15,
      marginVertical: 5,
      padding: 10,
      backgroundColor: colors.secondary
    },
    center: {
      alignItems: 'center'
    },
    centerScreen: {
      justifyContent: 'center'
    },
    paddingBott: {
      paddingBottom: 50
    },
    paddingVertical: {
      paddingVertical: 15
    },
    tab: {
      paddingLeft: 15
    },
    modalReceipsBack: {
      flex: 1,
      backgroundColor: '#000000AA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalReceipsCont: {
      width: '90%',
      backgroundColor: colors.primary,
      borderRadius: 15,
      padding: 10
    },
    modalReceips: {
      paddingTop: 15
    },
  })
    
    const StyledContainer = ({style={}, flex, screenContainer, screenMenuContainer, innerContainer,
      newAccount, userStatsLogin, userStats, userStatsProfile, flexRow, width50, width60, leftIcon, leftIconSearch, welcome, 
  row, rowTop, spaceBetween, spaceAround, flexStart, underline, underlineMeal, page, meal, center, centerScreen, paddingBott, 
  paddingVertical, tab, modalReceipsBack, modalReceipsCont, modalReceips, ...props}) => {
  const containerStyles = [
    flex && styles.flex,
    screenContainer && styles.screenContainer,
    screenMenuContainer && styles.screenMenuContainer,
    innerContainer && styles.innerContainer,
    newAccount && styles.newAccount,
    userStatsLogin && styles.userStatsLogin,
    userStats && styles.userStats,
    userStatsProfile && styles.userStatsProfile,
    flexRow && styles.flexRow,
    width50 && styles.width50,
    width60 && styles.width60,
    leftIcon && styles.leftIcon,
    leftIconSearch && styles.leftIconSearch,
    welcome && styles.welcome,
    row && styles.row,
    rowTop && styles.rowTop,
    spaceBetween && styles.spaceBetween,
    spaceAround && styles.spaceAround,
    flexStart && styles.flexStart,
    underline && styles.underline,
    underlineMeal && styles.underlineMeal,
    page && styles.page,
    meal && styles.meal,
    center && styles.center,
    centerScreen && styles.centerScreen,
    paddingBott && styles.paddingBott,
    paddingVertical && styles.paddingVertical,
    tab && styles.tab,
    modalReceipsBack && styles.modalReceipsBack,
    modalReceipsCont && styles.modalReceipsCont,
    modalReceips && styles.modalReceips,
    style
  ]
  return <View style={containerStyles} {...props}/>
}

export default StyledContainer