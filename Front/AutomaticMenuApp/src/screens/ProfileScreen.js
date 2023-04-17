import React,{ useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import StyledText from '../styles/StyledText'

import { userDataSimple } from '../../FormsData'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../Colors'

const ShowCategory = (categoryName) => {
  const [category, setCategory] = useState('')
  useEffect(() => {
    toggleModal()
  }, [''])
  const toggleModal = () => {
    if(categoryName.categoryName === "Email") {
      setCategory('example@gmail.com')
    } 
    else if(categoryName.categoryName === 'Password') {
      setCategory('******')
    } 
    else if(categoryName.categoryName === 'Name') {
      setCategory('Víctor')
    } 
    else if(categoryName.categoryName === 'Age') {
      setCategory('20 - 24')
    } 
    else if(categoryName.categoryName === 'Weight') {
      setCategory('60 - 69kg')
    } 
    else if(categoryName.categoryName === 'Sex') {
      setCategory('Man')
    } 
    else if(categoryName.categoryName === 'Exercise Routine') {
      setCategory('Sometimes')
    } 
    else if(categoryName.categoryName === 'Exercise Intensity') {
      setCategory('Mid')
    } 
    else if(categoryName.categoryName === 'Vegan/Vegetarian') {
      setCategory('No')
    }
  }
  
  return (
    <StyledText flex alignRight>{category}</StyledText>
  )
}

const ProfileScreen = () => {
  const navigation = useNavigation()

  return (
    <StyledContainer screenContainer>
      <FlatList
        ListHeaderComponent={
          <>
          <StyledContainer row spaceBetween>
            <StyledText tittleTab bold center>Profile</StyledText>
            <StyledButton preferences onPress={() => navigation.navigate('Preferences')}>
              <MaterialCommunityIcons  name='format-list-checks' size={50} color={colors.action}/>
            </StyledButton>
          </StyledContainer>
          </>
          }
        data={userDataSimple}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator = {false}
        renderItem = {({item}) => (
          <>
          <StyledContainer flexRow userStatsProfile>
            <StyledText label bold>{item.categoryName}</StyledText>
            <ShowCategory categoryName={item.categoryName}/>
          </StyledContainer>
          {item.categoryName!='Vegan/Vegetarian' ? <StyledContainer underline></StyledContainer> : <StyledContainer></StyledContainer>}
          </>
            
        )}
        keyExtractor={(item, index) => index}

        ListFooterComponent={
          <>
          <StyledButton 
            standard 
            signup 
            onPress={() => navigation.navigate('PersonalData')}> 
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