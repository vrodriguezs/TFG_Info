import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Dropdown } from 'react-native-element-dropdown';

import { auth } from '../../firebase'

import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import { styledDropdownStyles } from '../styles/StyledDropdown'

import { userData, ageDropdownData, weightDropdownData } from '../../FormsData'

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'

const SignUpScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const [textInputIsFocus, setInputIsFocus] = useState(false);

  const [userName, setUserName] = useState("")
  const [userDataSelect, setUserDataSelect] = useState(userData)

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  const [ageIsFocus, setAgeIsFocus] = useState(false);
  const [weightIsFocus, setWeightIsFocus] = useState(false);

  const [hidePassword, setHidePassword] = useState(true)

  const handleSignUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with:', user.email);
      })
      .catch(error => alert(error.message))
  }
  
  const handleOnPress = (item) => {
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

    //actualitzo el contingut d newItemCat sobre userStateCopy amb el q hi ha a l'índex foundIndexItemCat
    userStateCopy[foundIndexItemCat] = newItemCat

    //actualitzo tota la taula
    setUserDataSelect(userStateCopy)
  }

  const FormikInputValue = ({name, labelTitle, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    const [field, meta, helpers] = useField(name)

    return (
      <>
      <StyledContainer userStatsLogin>
        <StyledContainer leftIcon>
          <Octicons name={icon} size={30} color={/*meta.error ? colors.error : */colors.textPlaceholder}/>
        </StyledContainer>
        <StyledText label bold>{labelTitle}</StyledText>
        
        <StyledTextInput
          textInputBox
          errorContainer={meta.error}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props}
        />
        {isPassword && (
          <StyledButton rightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Octicons name={hidePassword ? 'eye-closed' : 'eye'} size={30} color={colors.action}/>
          </StyledButton>
        )}
        {meta.error ? <StyledText error>{meta.error}</StyledText> : <StyledText error></StyledText>}
      </StyledContainer>
      </>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={ (values) => handleSignUp(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer screenContainer>
            <StyledButton back onPress={() => navigation.navigate('Welcome')}>
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
                {/* textInput name */}
                <StyledText label bold>Name</StyledText>
                <StyledTextInput textInputLine 
                                  placeholder='Enter your name here'
                                  style={textInputIsFocus && { borderBottomColor: colors.actionLight}}
                                  onFocus={() => setInputIsFocus(true)}
                                  onBlur={() => setInputIsFocus(false)}
                                  onChange={(newName) => setUserName(newName)}
                ></StyledTextInput>
                </>
                }
              data={userDataSelect}
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
                    numColumns={2}
                    renderItem= {({item}) => (
                      <View>
                        <StyledButton userStats widthBig style={{borderColor: item.selected ? colors.actionLight : colors.secondary}} 
                        onPress = {() => handleOnPress(item)}>
                          <StyledText>{item.name}</StyledText>
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
                <StyledContainer flexRow>
                  {/* dropdown age */}
                  <StyledContainer userStats width50>
                    <StyledText label bold>Age</StyledText>
                    <Dropdown
                      style={[styledDropdownStyles.standard, styledDropdownStyles.age, ageIsFocus && { borderColor: colors.actionLight}]}
                      placeholderStyle={styledDropdownStyles.placeholderStyle}
                      selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                      data={ageDropdownData}
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={ageDropdownData[3].label}
                      value={age}
                      onFocus={() => setAgeIsFocus(true)}
                      onBlur={() => setAgeIsFocus(false)}
                      onChange={item => {
                        setAge(item.value);
                        setAgeIsFocus(false);
                      }}
                      renderItem = {item => (<Text style={styledDropdownStyles.textStyle}>{item.label}</Text>)}
                    />
                  </StyledContainer>

                  {/* dropdown weight */}
                  <StyledContainer userStats width50>
                    <StyledText label bold>Weight</StyledText>
                    <Dropdown
                      style={[styledDropdownStyles.standard, styledDropdownStyles.weight, weightIsFocus && { borderColor: colors.actionLight}]}
                      placeholderStyle={styledDropdownStyles.placeholderStyle}
                      selectedTextStyle={styledDropdownStyles.selectedTextStyle}
                      data={weightDropdownData}
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={weightDropdownData[5].label}
                      value={weight}
                      onFocus={() => setWeightIsFocus(true)}
                      onBlur={() => setWeightIsFocus(false)}
                      onChange={item => {
                        setWeight(item.value);
                        setWeightIsFocus(false);
                      }}
                      o
                      renderItem = {item => (<Text style={styledDropdownStyles.textStyle}>{item.label}</Text>)}
                    />
                  </StyledContainer>
                </StyledContainer>

                {/*email and password*/}
                <StyledContainer userStats>
                  <FormikInputValue
                    name='email'
                    labelTitle="Email"
                    icon="mail"
                    placeholder="example@mail.ext"
                    value={values.email}
                  />
                  <FormikInputValue
                    name='password'
                    labelTitle="Password"
                    icon="lock"
                    placeholder="******"
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                </StyledContainer>

                <StyledButton 
                  standard 
                  signup 
                  onPress={ () => handleSubmit()}>
                  <StyledText button bold >Sign Up</StyledText>
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

export default SignUpScreen