import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { ScrollView } from 'react-native'

import { firebase } from '../../firebase'

import { Formik, useField } from 'formik'
import { logInValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import { Octicons } from '@expo/vector-icons'
import { colors } from '../../Colors'
import { StyledImageBackground } from '../styles/StyledImageBackground'

const LoginScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: ''
  }

  const [hidePassword, setHidePassword] = useState(true)

  const handleLogin = (email, password) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
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
          <Octicons name={icon} size={30} color={colors.textPlaceholder}/>
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
      <StyledContainer underline/>
      </StyledContainer>
      </>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logInValidationSchema}
      onSubmit={ (values) => handleLogin(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer flex>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'transparent'}}>

              <StyledContainer screenContainer>

                <StyledIcon logo source={require('../assets/icons/logo.png')}/>

                <FormikInputValue
                  name='email'
                  labelTitle="Correu"
                  icon="mail"
                  placeholder="example@mail.ext"
                  value={values.email}
                />

                <FormikInputValue
                  name='password'
                  labelTitle="Contrasenya"
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
                  signup
                  onPress={() => handleSubmit()}>
                  <StyledText button bold >Iniciar sessió</StyledText>
                </StyledButton>
                <StyledContainer newAccount>
                  <StyledText small>Encara no tens compte? </StyledText>
                  <StyledButton link onPress={() => navigation.navigate('SignUp')}>
                    <StyledText small color bold>Registra't!</StyledText>
                  </StyledButton>
                </StyledContainer>

                <StyledImageBackground/>
              </StyledContainer>

            </ScrollView>
            <StyledImageBackground/>
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

export default LoginScreen