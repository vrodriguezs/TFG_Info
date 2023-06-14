import React, { useState, useRef } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native';
import axios from 'axios'

import { firebase } from '../../firebase'

import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText from '../styles/StyledText'
import StyledIcon from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import BackButton from '../specialButtons/BackButton';
import ScrollToTopButton from '../specialButtons/ScrollToTopButton';

import { preferencesData } from '../../FormsData'

import { colors } from '../../Colors'

import {
  nameToExport, ageToExport, weightToExport, heightToExport, sexToExport,
  exRoutineToExport, exIntensityToExport, vegToExport, dishesToExport
} from './PersonalDataScreen'

import { getEmail, getPassword } from './SignupScreen'
import { StyledImageBackground } from '../styles/StyledImageBackground';

const PreferencesScreen = ({ onDataSent }) => {
  const navigation = useNavigation()
  const route = useRoute();
  const arrivedFromProfile = route.params?.arrivedFromProfile || false;

  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const flatListRef = useRef(null);
  const intoAlerToExport = []
  const ingredientsToExport = []


  const handleScroll = (event) => {
    const topOffset = 400;
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollToTopVisible(offsetY > topOffset);
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0 });
  };

  const [preferencesDataSelect, setPreferencesDataSelect] = useState(preferencesData)

  const handlePreferencesScreen = () => {
    handlePreferences();
    if(!arrivedFromProfile || arrivedFromProfile === 'undefined') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(getEmail(), getPassword())
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Done preferences with:', user.email);
          console.log('Going to do logIn')
          handleLogin(getEmail(), getPassword())
          console.log('Going to store in db')
          updateDataToUserDatabase(); // Pass the user UID as an argument
          
        })
        .catch((error) => alert(error.message));
    } else {
      updateDataToUserDatabase(); // Pass the user UID as an argument
    }
    navigation.navigate('Home');
  };

  const handleLogin = (email, password) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handlePreferences = () => {
    preferencesDataSelect.forEach((category) => {
      if (category.categoryName === "Al·lèrgies i intoleràncies") {
        category.arg.forEach(item => {
          if (item.selected) {
            intoAlerToExport.push(item.name)
          }
        })
      }
      else {
        category.arg.forEach(item => {
          if (!item.selected) {
            ingredientsToExport.push(item.name)
          }
        })
      }
    })
  }

  const todoRef = firebase.firestore().collection('users')

  const updateDataToUserDatabase = () => {
    const data = {
      name: nameToExport,
      age: ageToExport,
      weight: weightToExport,
      height: heightToExport,
      sex: sexToExport,
      exRoutine: exRoutineToExport,
      exIntensity: exIntensityToExport,
      veg: vegToExport,
      dishes: dishesToExport,
      intoAler: intoAlerToExport,
      ingredients: ingredientsToExport,
      email: getEmail(),
      weeklyMenu: []
    }
    const userId = firebase.auth().currentUser.uid;
    const userRef = todoRef.doc(userId);
    console.log('AddData ',userId)
    userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        userRef
          .update(data)
          .then(() => {
            console.log('User data updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating user data:', error);
          });
      } else {
        userRef
          .set(data)
          .then(() => {
            console.log('User data saved successfully.');
          })
          .catch((error) => {
            console.error('Error saving user data:', error);
          });
      }
      sendDataToBackEnd(userId)
    })
    .catch((error) => {
      console.error('Error checking user document:', error);
    });
    
  }

  const sendDataToBackEnd = async (userId) => {
    const user = {
      name: nameToExport,
      age: ageToExport,
      weight: weightToExport,
      height: heightToExport,
      sex: sexToExport,
      exRoutine: exRoutineToExport,
      exIntensity: exIntensityToExport,
      veg: vegToExport,
      dishes: dishesToExport,
      intoAler: intoAlerToExport,
      ingredients: ingredientsToExport
    }

    try {
      const response = await axios.post('http://192.168.1.44:8080/api/generate-menu', 
      { user, userId })
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleOnPress = (item) => {
    //faig una còpia d tot l'array
    const userStateCopy = [...preferencesDataSelect]

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
    newItemCat = { ...newItemCat, arg: newItemCat.arg.map((i) => ({ ...i, selected: !((i.selected === false && i.name != item.name) || (i.name === item.name && i.selected === true)) })) }

    //actualitzo el contingut d newItemCat sobre userStateCopy amb el q hi ha a l'índex foundIndexItemCat
    userStateCopy[foundIndexItemCat] = newItemCat

    //actualitzo tota la taula
    setPreferencesDataSelect(userStateCopy)
  }

  return (
    <StyledContainer screenContainer>
      <BackButton screen={'PersonalData'} />
      <FlatList
        ListHeaderComponent={
          <>
            <StyledText tittle bold center>Preferències</StyledText>
            <StyledText center>Per a introduir les teves dades, prem sobre els botons.</StyledText>
          </>
        }
        ref={flatListRef}
        data={preferencesDataSelect}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <StyledContainer userStats>
            {/* flatLists categories buttons */}
            <FlatList
              ListHeaderComponent={
                <>
                  <StyledText label bold>{item.categoryName}</StyledText>
                  <StyledContainer underline />
                </>
              }
              data={item.arg}
              key={'_'}
              numColumns={3}
              renderItem={({ item }) => (
                <StyledContainer>
                  <StyledButton userPreferences widthSmall style={{ borderColor: item.selected ? colors.actionLight : colors.secondary }}
                    onPress={() => handleOnPress(item)}>
                    <StyledText>{item.name}</StyledText>
                    <StyledIcon buttonIconPreferences source={item.image} />
                  </StyledButton>
                </StyledContainer>
              )}
              keyExtractor={(item) => item.id}
            />
            <StyledContainer underline />
          </StyledContainer>

        )}
        keyExtractor={(item, index) => index}
        onScroll={handleScroll}

        ListFooterComponent={
          <>
            <StyledButton
              standard
              signup
              onPress={() => handlePreferencesScreen()}>
              <StyledText button bold >Començar</StyledText>
            </StyledButton>
          </>
        }
      />
      <ScrollToTopButton onPress={scrollToTop} visible={scrollToTopVisible} />
      <StyledImageBackground/>
    </StyledContainer>
  )
}

export default PreferencesScreen