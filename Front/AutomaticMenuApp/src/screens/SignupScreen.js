import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, ScrollView, FlatList } from 'react-native'
import { auth } from '../../firebase'
import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'
import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import { userData } from '../../FormsData'

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'

const SignUpScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSignUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const [select, setSelect] = useState(userData)
  
  const handleOnPress = (item) => {
    console.log('item: '+item)
    const newItem = select.map((pan) => {
      console.log('newItem1: '+newItem)
      pan.arg.map((val) => {
        console.log('item name '+item.name+' val name '+val.name)
        console.log('category '+pan.categoryName)
        console.log('selected ' +val.selected)
        if(val.selected) {
          val.selected = !val.selected
        }
        if(val.id===item.id) {
          console.log('is the same id')
          return {...val, selected : !val.selected}
        }
        else {
          console.log('is nothing')
          return val
        }
      })
      console.log('')
    })
    console.log('select: '+select)
    //console.log('newItem2: '+[{newItem}, {newItem}, {newItem}])
    //setSelect([...select, [{newItem}, {newItem}, {newItem}]])
  }

  const FormikInputValue = ({name, ...props}) => {
    const [field, meta, helpers] = useField(name)

    return (
      <>
        <StyledTextInput
          errorContainer={meta.error}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props}
        />
        {meta.error && <StyledText error>{meta.error}</StyledText>}
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
            <StyledButton back onPress={() => navigation.navigate('Login')}>
            <Octicons name="chevron-left" size={34} 
                            style={{
                                color: colors.text
                            }}
                        />
            </StyledButton>
              <FlatList
                ListHeaderComponent={
                  <>
                    <View>
                      <StyledIcon logo source={require('../assets/icons/logo.png')}/>
                      <StyledText appName>App Name</StyledText>
                    </View>
                    <StyledContainer userStatsOuter>
                      <StyledText label bold>Name</StyledText>
                      <StyledTextInput textInputLine placeholder='Enter your name here'></StyledTextInput>
                    </StyledContainer>
                  </>}
                data={select}
                showsVerticalScrollIndicator = {false}
                renderItem = {({item}) => (
                  <StyledContainer userStats>
                    <FlatList
                    ListHeaderComponent={
                      <StyledText label bold>{item.categoryName}</StyledText>
                    }
                      data={item.arg}
                      numColumns={2}
                      renderItem= {({item}) => (
                        <View>
                          <StyledButton userStats widthBig style={{borderColor: item.selected ? colors.action : colors.secondary}} 
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
                  <StyledContainer userStatsLogin>
                    <StyledText label>Email</StyledText>
                    <FormikInputValue
                      name='email'
                      placeholder="example@mail.ext"
                      value={values.email}
                    />
                  </StyledContainer>
                  <StyledContainer userStatsLogin>
                    <StyledText label>Password</StyledText>
                    <FormikInputValue
                      name='password'
                      placeholder="******"
                      value={values.password}
                      secureTextEntry
                    />
                  </StyledContainer>
                  <StyledButton 
                    standard 
                    login 
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