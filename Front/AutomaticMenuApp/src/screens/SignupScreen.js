import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { ScrollView } from 'react-native'

import { Formik, useField } from 'formik'
import { signUpValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import BackButton from '../specialButtons/BackButton';

import { Octicons } from '@expo/vector-icons'
import { colors } from '../../Colors'

import { StyledImageBackground } from '../styles/StyledImageBackground'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
}
let emailToExport = ''
let passwordToExport = ''

const SignUpScreen = () => {
  const navigation = useNavigation()

  const handleEmailChange = (text) => {
    emailToExport = text
  };

  const handlePasswordChange = (text) => {
    passwordToExport = text
  };

  const [hidePassword, setHidePassword] = useState(true)
  const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true)

  const handleSignUp = (email, password) => {
    handleEmailChange(email)
    handlePasswordChange(password)
    navigation.navigate('Welcome')
  }
  
  const FormikInputValue = ({name, labelTitle, icon, isPassword, isPasswordConfirmation, 
    hidePassword, hidePasswordConfirmation, setHidePassword, setHidePasswordConfirmation, ...props}) => {
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
        {isPasswordConfirmation && (
          <StyledButton rightIcon onPress={() => setHidePasswordConfirmation(!hidePasswordConfirmation)}>
            <Octicons name={hidePasswordConfirmation ? 'eye-closed' : 'eye'} size={30} color={colors.action}/>
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
      validationSchema={signUpValidationSchema}
      onSubmit={ (values) => handleSignUp(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer flex>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'transparent'}}>

              <StyledContainer screenContainer>
              <BackButton screen={'LogIn'}/>
                <StyledText tittle bold center>Registre</StyledText>
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
                <FormikInputValue
                  name='passwordConfirmation'
                  labelTitle="Confirma la contrasenya"
                  icon="lock"
                  placeholder="******"
                  value={values.passwordConfirmation}
                  secureTextEntry={hidePasswordConfirmation}
                  isPasswordConfirmation={true}
                  hidePasswordConfirmation={hidePasswordConfirmation}
                  setHidePasswordConfirmation={setHidePasswordConfirmation}
                />

                <StyledButton 
                  standard 
                  signup
                  onPress={() => handleSubmit()}>
                  <StyledText button bold >Registrar-se</StyledText>
                </StyledButton>

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

const getEmail = () => {
  return emailToExport
};

const getPassword = () => {
  return passwordToExport
};

export default SignUpScreen
export { getEmail, getPassword }