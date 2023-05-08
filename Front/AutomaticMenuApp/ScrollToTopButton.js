import React from 'react'
import StyledButton from './src/styles/StyledButton';

import { colors } from './Colors';

import { Octicons } from '@expo/vector-icons'

const ScrollToTopButton = ({ onPress, visible }) => {
    if (!visible) {
      return null;
    }
    return (
        <StyledButton scrollToTop onPress={onPress}>
        <Octicons name="chevron-up" 
                  size={50} 
                  style={{color: colors.action}}
        />
        </StyledButton>
    );
  };

export default ScrollToTopButton