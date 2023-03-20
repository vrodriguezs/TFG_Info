import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/core'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import { genre } from '../../FormsData'

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'
import { View, FlatList } from 'react-native';

const GenreScreen = () => {

  const navigation = useNavigation()

  const [select, setSelect] = useState(genre)
  
  const handleOnPress = (item) => {
    const newItem = select.map((val) => {
      if(val.selected) {
        val.selected = !val.selected
      }
      if(val.id===item.id) {
        return {...val, selected : !val.selected}
      }
      else {
        return val
      }
    })
    setSelect(newItem)
  }

  return (
    <StyledContainer screenContainer>
      <StyledButton back onPress={() => navigation.navigate('Welcome')}>
        <Octicons name="chevron-left"
                  size={34} 
                  style={{
                      color: colors.text
                  }}
        />
      </StyledButton>
      <StyledContainer innerContainer>
        <FlatList
        ListHeaderComponent={
          <StyledText label bold>Genre</StyledText>
        }
        data={select}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        renderItem= {({item}) => (
          <StyledContainer userStats>
            <StyledButton userStats widthBig style={{borderColor: item.selected ? colors.action : colors.secondary}} 
            onPress = {() => handleOnPress(item)}>
              <StyledText>{item.name}</StyledText>
            </StyledButton>
          </StyledContainer>
        )}
        keyExtractor={(item) => item.id}
        />
      </StyledContainer>
    </StyledContainer>
  )
}

export default GenreScreen