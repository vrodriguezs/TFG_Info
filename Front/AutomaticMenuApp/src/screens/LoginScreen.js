import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { View, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase'
import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/loginValidation'
import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import { imageStyles } from '../styles/StyledImage';

import { Ionicons, Octicons } from '@expo/vector-icons'
import { colors } from '../../Colors'

const LoginScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const [hidePassword, setHidePassword] = useState(true)

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
          style={{color:meta.error ? colors.error : colors.text}}
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
      onSubmit={ (values) => handleLogin(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer flex>

            <ScrollView showsVerticalScrollIndicator={false} style={[styles.scrollview]}>

              <StyledContainer screenContainer>

                <StyledIcon logo source={require('../assets/icons/logo_02.png')}/>

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

                <StyledButton 
                  standard 
                  login 
                  onPress={ () => handleSubmit()}>
                  <StyledText button bold >Log In</StyledText>
                </StyledButton>
                <StyledContainer newAccount>
                  <StyledText small>Don't have an account yet? </StyledText>
                    <StyledButton link onPress={() => navigation.navigate('Welcome')}>
                      <StyledText small color bold>Sign Up!</StyledText>
                    </StyledButton>
                </StyledContainer>

              </StyledContainer>

            </ScrollView>

            {/* <ImageBackground
                  style={[styles.background, {zIndex: -1}]}
                  source={require('../assets/icons/pissarra_10.jpg')}
            /> */}
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
 scrollview: {
   backgroundColor: 'transparent'
 }
});