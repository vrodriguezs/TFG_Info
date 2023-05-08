import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Dropdown } from 'react-native-element-dropdown';

import { firebase } from '../../firebase'
import { getEmail } from './SignupScreen'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import { styledDropdownStyles } from '../styles/StyledDropdown'

import BackButton from '../../BackButton';
import ScrollToTopButton from '../../ScrollToTopButton';

import { userData, ageDropdownData, weightDropdownData } from '../../FormsData'

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'
import { AppRegistry } from 'react-native-web'; //cuidao q ns q es aixo

const PersonalDataScreen = () => {
  const navigation = useNavigation()

  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const topOffset = 400;
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollToTopVisible(offsetY > topOffset);
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0 });
  };

  const [textInputIsFocus, setInputIsFocus] = useState(false);

  const [userName, setUserName] = useState('')
  const [userDataSelect, setUserDataSelect] = useState(userData)

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  const [ageIsFocus, setAgeIsFocus] = useState(false);
  const [weightIsFocus, setWeightIsFocus] = useState(false);

  const handlePersonalData = () => {
    navigation.navigate('Preferences')
    // firebase.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Signed up with:', user.email);
    //     navigation.navigate('Preferences')
    //   })
    //   .catch(error => alert(error.message))
  }

  const todoRef = firebase.firestore().collection('users')

  const addField = () => {
    if(userName && userName.length > 0) {
      //utilitzem filter() per obtenir tots els objectes que tenen selected=true
      const allData = userDataSelect.flatMap(category => category.arg.filter(arg => arg.selected));
  
      //obtenim un array dels valors de name de tots els objectes que tenen selected=true
      const selectedData = allData.map(objet => objet.name);

      const data = {
        name: userName,
        sex: selectedData[0],
        exRout: selectedData[1],
        exInt: selectedData[2],
        veg: selectedData[3],
        email: getEmail()
      }
      todoRef
        .add(data)
        .then(() => {
          setUserName('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
  
  const handleOnPressOption = (item) => {
    //faig una còpia d tot l'array
    const userStateCopy = [...userDataSelect]

    //faig una còpia només de l'objecte (+array) d l'índex q té un nom igual al q té el botó q es clica
    //els !! retornen un boolean d la condició d l'arroy function -> si troben un objecte q tingui el mateix nom q el botó q es clica
    var newItemCat = userStateCopy.find((i) => !!i.arg.find((arg) => arg.name === item.name))

    //em guardo l'índex de l'objecte q vull modificar
    const foundIndexItemCat = userStateCopy.findIndex((i) => !!i.arg.find((arg) => arg.name === item.name))
    
    //...newItemCat, arg: -> faig una còpia d tot l'objecte newItemsCat i només modificaré l'objecte arg
    //recorro l'array arg amb map
    //...i, selected: -> faig una còpia d tot l'objecte i i només modificaré l'objecte selected
    //recorrent tot l'array, mira si el nom d l'objecte és el mateix al del botó q es clica i retorna un true o un false
    //sobrescriu l'objecte selected, x tant independentment del número d'objectes q hi hagi, sempre funcionarà, pq
    //setejarà a true si el nom coincideix i a false si no
    newItemCat = {...newItemCat, arg: newItemCat.arg.map((i) => ({...i, selected: i.name === item.name}))}

    //newItemCat = {...newItemCat, arg: newItemCat.arg.map((i) => ({...i, selected: !((i.selected === false && i.name != item.name) || (i.name === item.name && i.selected === true))}))}

    //actualitzo el contingut d newItemCat sobre userStateCopy amb el q hi ha a l'índex foundIndexItemCat
    userStateCopy[foundIndexItemCat] = newItemCat

    //actualitzo tota la taula
    setUserDataSelect(userStateCopy)
  }


  return (
    <StyledContainer screenContainer>
      <BackButton screen={'Welcome'}/>
      <FlatList
        ListHeaderComponent={
          <>
          <StyledText tittle bold center>Let us know about yourself</StyledText>
          {/* textInput name */}
          <StyledContainer userStats>
            <StyledText label bold>Name</StyledText>
            <StyledTextInput textInputLine 
                              placeholder='Enter your name here'
                              style={textInputIsFocus && { borderBottomColor: colors.actionLight}}
                              onFocus={() => setInputIsFocus(true)}
                              onBlur={() => setInputIsFocus(false)}
                              onChangeText={newName => setUserName(newName)}
            ></StyledTextInput>
          </StyledContainer>

          <StyledContainer flexRow>
            {/* dropdown age */}
            <StyledContainer userStats width50>
              <StyledText label bold>Age</StyledText>
              <StyledContainer underline/>
              <Dropdown
                style={[styledDropdownStyles.standard, styledDropdownStyles.age, ageIsFocus && { borderColor: colors.actionLight}]}
                placeholderStyle={styledDropdownStyles.placeholderStyle}
                selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                data={ageDropdownData}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={ageDropdownData[4].label}
                value={age}
                onFocus={() => setAgeIsFocus(true)}
                onBlur={() => setAgeIsFocus(false)}
                onChange={item => {
                  setAge(item.value);
                  setAgeIsFocus(false);
                }}
                showsVerticalScrollIndicator={false}
                activeColor={colors.primary}
                containerStyle={{backgroundColor: colors.secondary, borderRadius: 15}}
                renderItem = {item => (<Text style={styledDropdownStyles.textStyle}>{item.label}</Text>)}
              />
              <StyledContainer underline/>
            </StyledContainer>

            {/* dropdown weight */}
            <StyledContainer userStats width50>
              <StyledText label bold>Weight</StyledText>
              <StyledContainer underline/>
              <Dropdown
                style={[styledDropdownStyles.standard, styledDropdownStyles.weight, weightIsFocus && { borderColor: colors.actionLight}]}
                placeholderStyle={styledDropdownStyles.placeholderStyle}
                selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                data={weightDropdownData}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={weightDropdownData[7].label}
                value={weight}
                onFocus={() => setWeightIsFocus(true)}
                onBlur={() => setWeightIsFocus(false)}
                onChange={item => {
                  setWeight(item.value);
                  setWeightIsFocus(false);
                }}
                showsVerticalScrollIndicator={false}
                activeColor={colors.primary}
                containerStyle={{backgroundColor: colors.secondary, borderRadius: 15}}
                renderItem = {item => (<Text style={styledDropdownStyles.textStyle}>{item.label}</Text>)}
              />
              <StyledContainer underline/>
            </StyledContainer>
          </StyledContainer>
          {/* dropdown height */}
          <StyledContainer userStats width60>
            <StyledText label bold>Height</StyledText>
            <StyledContainer underline/>
            <Dropdown
              style={[styledDropdownStyles.standard, styledDropdownStyles.age, ageIsFocus && { borderColor: colors.actionLight}]}
              placeholderStyle={styledDropdownStyles.placeholderStyle}
              selectedTextStyle={styledDropdownStyles.selectedTextStyle}
              data={ageDropdownData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'1,6m - 1,7m'}
              value={age}
              onFocus={() => setAgeIsFocus(true)}
              onBlur={() => setAgeIsFocus(false)}
              onChange={item => {
                setAge(item.value);
                setAgeIsFocus(false);
              }}
              showsVerticalScrollIndicator={false}
              activeColor={colors.primary}
              containerStyle={{backgroundColor: colors.secondary, borderRadius: 15}}
              renderItem = {item => (<Text style={styledDropdownStyles.textStyle}>{item.label}</Text>)}
            />
            <StyledContainer underline/>
          </StyledContainer>
          </>
          }
        ref={flatListRef}
        data={userDataSelect}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator = {false}
        renderItem = {({item}) => (
          <StyledContainer userStats>
            {/* flatLists categories buttons */}
            <FlatList
            ListHeaderComponent={
              <>
              <StyledText label bold>{item.categoryName}</StyledText>
              <StyledContainer underline/>
              {/* setCategory(item.categoryName) */}
              </>
            }
              data={item.arg}
              numColumns={2}
              renderItem= {({item}) => (
                <StyledContainer>
                  <StyledButton userStats widthBig style={{borderColor: item.selected ? colors.actionLight : colors.secondary}} 
                  onPress = {() => handleOnPressOption(item)}>
                    <StyledText>{item.name}</StyledText>
                  </StyledButton>
                  {item.selected ? <StyledIcon buttonIcon source={item.image}/> : <StyledIcon/>}
                </StyledContainer>
              )}
              keyExtractor={(item) => item.id}
              />
              <StyledContainer underline/>
          </StyledContainer>
            
        )}
        keyExtractor={(item, index) => index}
        onScroll={handleScroll}

        ListFooterComponent={
          <>

          <StyledButton 
            standard 
            signup 
            onPress={() => handlePersonalData()}>
            <StyledText button bold >Next</StyledText>
          </StyledButton>

          </>
        }
        />
      <ScrollToTopButton onPress={scrollToTop} visible={scrollToTopVisible}/>
    </StyledContainer>
  )
}

export default PersonalDataScreen