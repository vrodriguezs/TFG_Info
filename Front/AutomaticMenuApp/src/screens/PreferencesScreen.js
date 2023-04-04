import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { auth } from '../../firebase'

import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import { preferencesData } from '../../FormsData'

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'

const PreferencesScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const [userName, setUserName] = useState("")
  const [preferencesDataSelect, setPreferencesDataSelect] = useState(preferencesData)

  const handlePreferences = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Done preferences with:', user.email);
        navigation.navigate('Home')
      })
      .catch(error => alert(error.message))
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
    newItemCat = {...newItemCat, arg: newItemCat.arg.map((i) => ({...i, selected: i.name === item.name}))}

    //actualitzo el contingut d newItemCat sobre userStateCopy amb el q hi ha a l'índex foundIndexItemCat
    userStateCopy[foundIndexItemCat] = newItemCat

    //actualitzo tota la taula
    setPreferencesDataSelect(userStateCopy)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={ (values) => handlePreferences(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer screenContainer>
            <StyledButton back onPress={() => navigation.navigate('SignUp')}>
              <Octicons name="chevron-left" 
                        size={50} 
                        style={{
                            color: colors.text
                        }}
                />
            </StyledButton>
            <FlatList
              ListHeaderComponent={
                <>
                </>
                }
              data={preferencesDataSelect}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
              showsVerticalScrollIndicator = {false}
              renderItem = {({item}) => (
                <StyledContainer userStats>
                  {/* flatLists categories buttons */}
                  <FlatList
                  ListHeaderComponent={
                    <StyledText label bold>{item.categoryName}</StyledText>
                  }
                    data={item.arg}
                    numColumns={3}
                    renderItem= {({item}) => (
                      <View>
                        <StyledButton userStats widthBig style={{borderColor: item.selected ? colors.actionLight : colors.secondary}} 
                        onPress = {() => handleOnPress(item)}>
                          <StyledText>{item.name}</StyledText>
                          <StyledIcon buttonIconPreferences source={item.image}/>
                        </StyledButton>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                    />
                </StyledContainer>
                  
              )}
              keyExtractor={(item, index) => index}

              ListFooterComponent={
                <>
                <StyledButton 
                  standard 
                  signup 
                  onPress={ () => handleSubmit()}>
                  <StyledText button bold >Start</StyledText>
                </StyledButton>
                </>
              }
            />
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

export default PreferencesScreen