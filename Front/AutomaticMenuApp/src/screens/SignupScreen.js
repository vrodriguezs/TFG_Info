import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text, Image, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Dropdown } from 'react-native-element-dropdown';

import { firebase } from '../../firebase'

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

import { Octicons, AntDesign } from '@expo/vector-icons'
import { AppRegistry } from 'react-native-web'; //cuidao q ns q es aixo

const SignUpScreen = () => {
  const navigation = useNavigation()

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const [hidePassword, setHidePassword] = useState(true)
  const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true)

  const handleSignUp = (email, password) => {
    navigation.navigate('Welcome')
    // firebase.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Signed up with:', user.email);
    //     navigation.navigate('Welcome')
    //   })
    //   .catch(error => alert(error.message))
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
      validationSchema={loginValidationSchema}
      onSubmit={ (values) => handleSignUp(values.email, values.password)
      }
      behavior="padding"
    >
      {({handleSubmit, values}) => {
        return (
          <StyledContainer screenContainer>
            <StyledButton back onPress={() => navigation.navigate('LogIn')}>
              <Octicons name="chevron-left" 
                        size={50} 
                        style={{color: colors.text}}
              />
            </StyledButton>
            <StyledText tittle bold center>SignUp</StyledText>
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
            </StyledContainer>

            <StyledButton 
              standard 
              signup 
              onPress={() => () => handleSubmit()}>
              <StyledText button bold >Sign Up</StyledText>
            </StyledButton>
          </StyledContainer>
        )
      }}
    </Formik>
  )
}

export default SignUpScreen