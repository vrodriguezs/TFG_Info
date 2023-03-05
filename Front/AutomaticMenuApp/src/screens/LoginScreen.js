import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, ScrollView } from 'react-native'
import { auth } from '../../firebase'
import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'
import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import StyledTextLink from '../styles/StyledTextLink'

const LoginScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const handleLogin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //console.log('Logged in with:', user.email);
        navigation.navigate('Home')
      })
      .catch(error => alert(error.message))
  }

  const FormikInputValue = ({name, ...props}) => {
    const [field, meta, helpers] = useField(name)

    return (
      <>
        <StyledTextInput
          textInputBox
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
      onSubmit={ (values) => handleLogin(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer screenContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <StyledIcon logo source={require('../assets/icons/logo.png')}/>
                <StyledText appName>App Name</StyledText>
              </View>
              <View>
                <StyledContainer userStatsLogin>
                  <StyledText label bold>Email</StyledText>
                  <FormikInputValue
                    name='email'
                    placeholder="example@mail.ext"
                    value={values.email}
                  />
                </StyledContainer>

                <StyledContainer userStatsLogin>
                  <StyledText label bold>Password</StyledText>
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
                  <StyledText standard bold >Log In</StyledText>
                </StyledButton>
                <StyledContainer newAccount>
                  <StyledText small>Don't have an account yet? </StyledText>
                    <StyledTextLink onPress={() => navigation.navigate('Signup')}>
                      <StyledText small color bold>Sign Up!</StyledText>
                    </StyledTextLink>
                </StyledContainer>
              </View>
            </ScrollView>
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

export default LoginScreen







// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged(user => {
//     if (user) {
//       navigation.replace("Preferences")
//     }
//   })

//   return unsubscribe
// }, [])