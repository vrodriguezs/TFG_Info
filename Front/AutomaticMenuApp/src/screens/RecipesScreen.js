import React from 'react'

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'

const RecipesScreen = () => {
  return (
    <StyledContainer screenMenuContainer centerScreen>
      <StyledText>Recipes Screen</StyledText>
      <StyledContainer underlineMeal/>
      <StyledText>When comming from the menu it will show </StyledText>
      <StyledText>the specific receip</StyledText>
    </StyledContainer>
  )

}


export default RecipesScreen