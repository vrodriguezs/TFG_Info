import { useNavigation } from '@react-navigation/core'

import StyledTextInput from '../styles/StyledTextInput'
import StyledText  from '../styles/StyledText'
import StyledIcon  from '../styles/StyledIcon'
import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import { colors } from '../../Colors'

import { Octicons } from '@expo/vector-icons'
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const WelcomeScreen = () => {

  const navigation = useNavigation()

  return (
    <StyledContainer flex>
      <StyledContainer screenContainer>
        <StyledButton back onPress={() => navigation.navigate('Login')}>
          <Octicons name="chevron-left"
                    size={50} 
                    style={{
                        color: colors.text
                    }}
          />
        </StyledButton>
        <StyledContainer innerContainer>
          <StyledIcon logoWelcome source={require('../assets/icons/logo_02.png')}/>
          <StyledContainer welcome>
            <StyledContainer row>
              <StyledText welcome colorlight bold>Welcome </StyledText>
              <StyledText welcome text>to </StyledText>
              <StyledText welcome colorlight bold>Wellfood,</StyledText>
            </StyledContainer>
            <StyledContainer row>
              <StyledText welcome text>where your </StyledText>
              <StyledText welcome colorlight bold>Wellness</StyledText>
            </StyledContainer>
            <StyledText welcome text>is what really matters</StyledText>
          </StyledContainer>
          <StyledButton 
            standard 
            welcome
            onPress={() => navigation.navigate('SignUp')}>
            <StyledText color bold >Let's get started</StyledText>
          </StyledButton>
        </StyledContainer>
        
        <ImageBackground
          style={[styles.background, {zIndex: -1}]}
          source={require('../assets/icons/leavesBackground_02.png')}
        />
      </StyledContainer>
    </StyledContainer>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
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