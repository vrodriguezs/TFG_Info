import React from 'react'
import { useNavigation } from '@react-navigation/core'
import StyledButton from './src/styles/StyledButton';

import { colors } from './Colors';

import { Octicons } from '@expo/vector-icons'

const BackButton = ({ screen }) => {
  const navigation = useNavigation()
    return (
      <StyledButton back onPress={() => navigation.navigate(screen)}>
      <Octicons name="chevron-left" 
                size={50} 
                style={{color: colors.text}}
      />
    </StyledButton>
    );
  };

export default BackButton