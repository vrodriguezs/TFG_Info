import { useNavigation } from '@react-navigation/core'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'

import BackButton from '../../BackButton';

import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { StyledImageBackground } from '../styles/StyledImageBackground'

const WelcomeScreen = () => {

  const navigation = useNavigation()

  return (
    <StyledContainer flex>
      <StyledContainer screenContainer>
      <BackButton screen={'SignUp'}/>
        <StyledContainer innerContainer>
          <StyledIcon logoWelcome source={require('../assets/icons/logo_02.png')}/>
          <StyledContainer welcome>
            <StyledContainer flexRow>
              <StyledText welcome colorlight bold>Benvingut </StyledText>
              <StyledText welcome text>a </StyledText>
              <StyledText welcome colorlight bold>Wellfood,</StyledText>
            </StyledContainer>
            <StyledContainer flexRow>
              <StyledText welcome text>on el teu </StyledText>
              <StyledText welcome colorlight bold>benestar </StyledText>
              <StyledText welcome>és </StyledText>
            </StyledContainer>
            <StyledText welcome text>el que realment importa</StyledText>
          </StyledContainer>
          <StyledButton 
            standard 
            welcome
            onPress={() => navigation.navigate(/*'Home'*/'PersonalData')}>
            <StyledText getStarted color bold >Comencem</StyledText>
          </StyledButton>
        </StyledContainer>
        
        <StyledImageBackground className={'Welcome'}/>

      </StyledContainer>
    </StyledContainer>
  )
}

export default WelcomeScreen