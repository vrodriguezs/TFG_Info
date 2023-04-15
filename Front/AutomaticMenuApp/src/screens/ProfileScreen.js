import React from 'react'
import { StyleSheet, View, Text, FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import StyledText from '../styles/StyledText'

import { userDataSimple } from '../../FormsData'


const ProfileScreen = () => {
  const navigation = useNavigation()

  return (
    <StyledContainer screenContainer>
      <FlatList
        ListHeaderComponent={
          <>
          <StyledText tittle bold center>Profile</StyledText>
          </>
          }
        data={userDataSimple}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator = {false}
        renderItem = {({item}) => (
          <>
          <StyledContainer flexRow userStatsProfile>
            <StyledText label bold>{item.categoryName}</StyledText>
            <StyledText flex alignRight>Pepito</StyledText>
          </StyledContainer>
          {item.categoryName!='Password' ? <StyledContainer underline></StyledContainer> : <StyledContainer></StyledContainer>}
          </>
            
        )}
        keyExtractor={(item, index) => index}

        ListFooterComponent={
          <>
          <StyledButton 
            standard 
            signup 
            onPress={() => navigation.navigate('SignUp')}> 
            {/*anar al signup pero sense fer cap signup d'usuari, sino update*/}
            {/*ergo posar un atribut o algo q identifiqui quan es ve d la screen d profile*/}
            <StyledText button bold >Update</StyledText>
          </StyledButton>
          </>
        }
      />





    </StyledContainer>
  )

}

export default ProfileScreen