import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { ScrollView } from 'react-native'

import { firebase } from '../../firebase'

import { Formik, useField } from 'formik'
import { signUpValidationSchema } from '../validationSchemas/loginValidation'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import { Octicons } from '@expo/vector-icons'
import { colors } from '../../Colors'

import { AppRegistry } from 'react-native-web'; //cuidao q ns q es aixo, utilitza web, potser x això no anava

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
}
let emailToExport = ''

const SignUpScreen = () => {
  const navigation = useNavigation()


  const handleEmailChange = (text) => {
    emailToExport = text
  };

  const [hidePassword, setHidePassword] = useState(true)
  const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true)

  const handleSignUp = (email, password) => {
    handleEmailChange(email)
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with:', user.email);
        navigation.navigate('Welcome')
      })
      .catch(error => alert(error.message))
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
                <StyledButton back onPress={() => navigation.navigate('LogIn')}>
                  <Octicons name="chevron-left" 
                            size={50} 
                            style={{color: colors.text}}
                  />
                </StyledButton>
                <StyledText tittle bold center>SignUp</StyledText>
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
                <FormikInputValue
                  name='passwordConfirmation'
                  labelTitle="Confirm password"
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
                  <StyledText button bold >Sign Up</StyledText>
                </StyledButton>

              </StyledContainer>

            </ScrollView>
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

const getEmail = () => {
  return emailToExport
};

export default SignUpScreen
export { getEmail }