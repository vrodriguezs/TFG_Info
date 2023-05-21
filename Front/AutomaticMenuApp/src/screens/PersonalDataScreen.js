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

import { userData, ageDropdownData, weightDropdownData, heightDropdownData } from '../../FormsData'

import { colors } from '../../Colors'
import { AppRegistry } from 'react-native-web'; //cuidao q ns q es aixo

const SCROLL_TOP_OFFSET = 400

const DEFAULT_AGE_LABEL = ageDropdownData[3].label
const DEFAULT_WEIGHT_LABEL = weightDropdownData[5].label
const DEFAULT_HEIGHT_LABEL = heightDropdownData[3].label
const DEFAULT_AGE = ageDropdownData[3].export
const DEFAULT_WEIGHT = weightDropdownData[5].export
const DEFAULT_HEIGHT = heightDropdownData[3].export
const DEFAULT_SEX = "Dona"
const DEFAULT_EX_ROUTINE = "Sovint"
const DEFAULT_EX_INTENSITY = "Mitjana"
const DEFAULT_VEG = "No"
const DEFAULT_DISHES = 4

const SEX = "Sexe"
const EX_ROUTINE = "Rutina d'exercici"
const EX_INTENSITY = "Intensitat d'exercici"
const VEG = "Ets vegà o vegetarià?"
const DISHES = "Àpats"

const TWO_DISHES = "Esmorzar i Dinar"
const THREE_DISHES = "Esmorzar, Dinar i Sopar"
const FOUR_DISHES = "Esmorzar, Dinar, Berenar i Sopar"
const FIVE_DISHES = "Esmorzar, Mig Matí Dinar, Berenar i Sopar"

let nameToExport = "Anònim";
let ageToExport = DEFAULT_AGE;
let weightToExport = DEFAULT_WEIGHT;
let heightToExport = DEFAULT_HEIGHT;
let sexToExport = DEFAULT_SEX;
let exRoutineToExport = DEFAULT_EX_ROUTINE;
let exIntensityToExport = DEFAULT_EX_INTENSITY;
let vegToExport = DEFAULT_VEG;
let dishesToExport = DEFAULT_DISHES;

const PersonalDataScreen = () => {
  const navigation = useNavigation()

  const handleNameChange = (text) => {nameToExport = text};
  const handleAgeChange = (text) => {ageToExport = text};
  const handleWeightChange = (text) => {weightToExport = text};
  const handleHeightChange = (text) => {heightToExport = text};
  const handleSexChange = (text) => {sexToExport = text};
  const handleExRoutineChange = (text) => {exRoutineToExport = text};
  const handleExIntensityChange = (text) => {exIntensityToExport = text};
  const handleVegChange = (text) => {vegToExport = text};
  const handleDishChange = (text) => {dishesToExport = text};

  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const topOffset = SCROLL_TOP_OFFSET;
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
  const [height, setHeight] = useState(0);
  
  const [ageIsFocus, setAgeIsFocus] = useState(false);
  const [weightIsFocus, setWeightIsFocus] = useState(false);
  const [heightIsFocus, setHeightIsFocus] = useState(false);

  const [dish, setDish] = useState(FOUR_DISHES)

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
    if(!isNaN(item.name)) {
      handleDishChange(item.name)
      switch (item.name.toString()) {
        case '2':
          setDish(TWO_DISHES)
          break
        case '3':
          setDish(THREE_DISHES)
          break
        case '4':
          setDish(FOUR_DISHES)
          break
        case '5':
          setDish(FIVE_DISHES)
          break
      }
    }
    else if(item.categoryName===SEX) {
      handleSexChange(item.name)
    }
    else if(item.categoryName===EX_ROUTINE) {
      handleExRoutineChange(item.name)
    }
    else if(item.categoryName===EX_INTENSITY) {
      handleExIntensityChange(item.name)
    }
    else if(item.categoryName===VEG) {
      handleVegChange(item.name)
    }
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
          <StyledText tittle bold center>Explica'ns una mica més sobre tu</StyledText>
          {/* textInput name */}
          <StyledContainer userStats>
            <StyledText label bold>Nom</StyledText>
            <StyledTextInput textInputLine 
                              placeholder='Escriu el teu nom aquí'
                              style={textInputIsFocus && { borderBottomColor: colors.actionLight}}
                              onFocus={() => setInputIsFocus(true)}
                              onBlur={() => setInputIsFocus(false)}
                              onChangeText={newName => {
                                setUserName(newName)
                                handleNameChange(newName)
                              }}
            ></StyledTextInput>
          </StyledContainer>

          <StyledContainer flexRow>
            {/* dropdown age */}
            <StyledContainer userStats width50>
              <StyledText label bold>Edat</StyledText>
              <StyledContainer underline/>
              <Dropdown
                style={[styledDropdownStyles.standard, styledDropdownStyles.age, ageIsFocus && { borderColor: colors.actionLight}]}
                placeholderStyle={styledDropdownStyles.placeholderStyle}
                selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                data={ageDropdownData}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={DEFAULT_AGE_LABEL}
                value={age}
                onFocus={() => setAgeIsFocus(true)}
                onBlur={() => setAgeIsFocus(false)}
                onChange={item => {
                  setAge(item.value);
                  setAgeIsFocus(false);
                  handleAgeChange(ageDropdownData[item.value-1].export)
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
              <StyledText label bold>Pes</StyledText>
              <StyledContainer underline/>
              <Dropdown
                style={[styledDropdownStyles.standard, styledDropdownStyles.weight, weightIsFocus && { borderColor: colors.actionLight}]}
                placeholderStyle={styledDropdownStyles.placeholderStyle}
                selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                data={weightDropdownData}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={DEFAULT_WEIGHT_LABEL}
                value={weight}
                onFocus={() => setWeightIsFocus(true)}
                onBlur={() => setWeightIsFocus(false)}
                onChange={item => {
                  setWeight(item.value);
                  setWeightIsFocus(false);
                  handleWeightChange(weightDropdownData[item.value-1].export)
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
          <StyledContainer userStats>
            <StyledText label bold>Alçada</StyledText>
            <StyledContainer underline/>
            <Dropdown
              style={[styledDropdownStyles.standard, styledDropdownStyles.height, heightIsFocus && { borderColor: colors.actionLight}]}
              placeholderStyle={styledDropdownStyles.placeholderStyle}
              selectedTextStyle={styledDropdownStyles.selectedTextStyle}
              data={heightDropdownData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={DEFAULT_HEIGHT_LABEL}
              value={height}
              onFocus={() => setHeightIsFocus(true)}
              onBlur={() => setHeightIsFocus(false)}
              onChange={item => {
                setHeight(item.value);
                setHeightIsFocus(false);
                handleHeightChange(heightDropdownData[item.value-1].export)
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
              {item.categoryName===DISHES && <StyledText center>{dish}</StyledText>}
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
            <StyledText button bold >Següent</StyledText>
          </StyledButton>

          </>
        }
        />
      <ScrollToTopButton onPress={scrollToTop} visible={scrollToTopVisible}/>
    </StyledContainer>
  )
}


export {nameToExport}
export {ageToExport}
export {weightToExport}
export {heightToExport}
export {sexToExport}
export {exRoutineToExport}
export {exIntensityToExport}
export {vegToExport}
export {dishesToExport}

export default PersonalDataScreen