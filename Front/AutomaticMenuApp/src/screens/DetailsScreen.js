import React from 'react'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledIcon from '../styles/StyledIcon'
import StyledButton from '../styles/StyledButton'

import { Octicons } from '@expo/vector-icons'; 
import { colors } from '../../Colors'
import { StyledImageBackground } from '../styles/StyledImageBackground';

const getImageByCategory = (category) => {
  switch (category) {
    case 'verdures':
      return require('../assets/icons/Preferences/Vegetables/leavesAndStems.png')
    case 'fruites':
      return require('../assets/icons/Preferences/Fruits/pomes.png')
    case 'cereals':
      return require('../assets/icons/Preferences/Grains/bread.png')
    case 'llegums':
      return require('../assets/icons/Preferences/Legumes/chickpeas.png')
    case 'proteïnes':
      return require('../assets/icons/Preferences/Proteins/chicken.png')
    case 'llet i derivats':
      return require('../assets/icons/Preferences/MilkAndDerivatives/milk.png')
    case 'veg':
      return require('../assets/icons/Preferences/Veg/veg.png')
    case 'noVeg':
      return require('../assets/icons/Preferences/Veg/noVeg.png')
    case 'Ous':
      return require('../assets/icons/Preferences/IntoAndAller/egg.png')
    case 'Fructosa':
      return require('../assets/icons/Preferences/IntoAndAller/fructose.png')
    case 'Gluten':
      return require('../assets/icons/Preferences/IntoAndAller/gluten.png')
    case 'Lactosa':
      return require('../assets/icons/Preferences/IntoAndAller/lactose.png')
    case 'Fruits secs':
      return require('../assets/icons/Preferences/IntoAndAller/nuts.png')
    case 'Marisc':
      return require('../assets/icons/Preferences/IntoAndAller/seafood.png')
    default:
      return;
  }
};

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation()

  const { dish } = route.params;

  let optionalTitleDisplayed = false

  return (
    <StyledContainer flex>
      <StyledContainer screenContainer>
        <StyledButton back onPress={() => navigation.goBack(null)}>
          <Octicons name="chevron-left" 
                    size={50} 
                    style={{color: colors.text}}
          />
        </StyledButton>
        <StyledContainer row>
          <StyledText big> {dish.name} </StyledText>
          {dish.veg.toString() === 'true' ? (
            <StyledIcon iconMenu source={getImageByCategory('veg')} />
          ) : <StyledIcon iconMenu source={getImageByCategory('noVeg')} />}
        </StyledContainer>
        <StyledContainer row spaceAround paddingVertical>
          <StyledContainer row>
            <Octicons name="flame" size={24} color={colors.actionLight} />
            <StyledText> {dish.kcal}</StyledText>
          </StyledContainer>
          <StyledContainer row>
            <Octicons name="people" size={24} color={colors.actionLight} />
            <StyledText> 2 plats</StyledText>
          </StyledContainer>
          <StyledContainer row>
            <Octicons name="clock" size={24} color={colors.actionLight} />
            <StyledText> {dish.time}</StyledText>
          </StyledContainer>
        </StyledContainer>
        
        {dish.includeRecipe.toString() === 'true' && (
          <StyledContainer>
            <StyledContainer>
              <StyledContainer meal>
                <StyledContainer paddingVertical>
                  <StyledText subtittle>Ingredients</StyledText>
                </StyledContainer>
                {dish.recipe.length > 5 || dish.recipe.some(ingredient => ingredient.includes(":")) ? (
                  <StyledContainer rowTop paddingVertical>
                    <StyledContainer width50>
                      {dish.recipe
                        .slice(0, Math.ceil(dish.recipe.length / 2))
                        .map((ingredient, index) => (
                          <StyledText key={index}>
                            {ingredient.includes(":") ? (
                              <StyledText bold>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                            ) : (
                              <StyledText>· {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                            )}
                          </StyledText>
                      ))}
                    </StyledContainer>
                    <StyledContainer width50 tab>
                      {dish.recipe
                        .slice(Math.ceil(dish.recipe.length / 2))
                        .map((ingredient, index) => (
                          <StyledText key={index}>
                            {ingredient.includes(":") ? (
                              <StyledText bold>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                            ) : (
                              <StyledText >· {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                            )}
                          </StyledText>
                        ))}
                    </StyledContainer>
                  </StyledContainer>
                ) : (
                  <StyledContainer paddingVertical>
                    {dish.recipe.map((ingredient, index) => (
                      <StyledText key={index}>· {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                    ))}
                  </StyledContainer>
                )}
              </StyledContainer>
            </StyledContainer>
            <StyledContainer>
              {dish.optional.length > 0 && (
              <>
                {!optionalTitleDisplayed && (
                  <>
                  <StyledContainer>
                    <StyledContainer meal>
                      <StyledContainer paddingVertical>
                        <StyledText subtittle>Opcional</StyledText>
                      </StyledContainer>
                      <StyledContainer paddingVertical>
                        {dish.optional.map((ingredient, index) => (
                          <StyledContainer key={index}>
                            <StyledText>· {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</StyledText>
                          </StyledContainer>
                        ))}
                      </StyledContainer>
                      {optionalTitleDisplayed = true}
                    </StyledContainer>
                  </StyledContainer>
                  </>
                )}
              </>
              )}
            </StyledContainer>
          </StyledContainer>
        )}
        <StyledContainer underlineMeal/>
        <StyledContainer row spaceAround paddingVertical>
          <StyledContainer center>
            <StyledContainer row>
              {dish.ingredients
                .reduce((uniqueIngredients, ingredient) => {
                  if (
                    ingredient.hasOwnProperty('category') &&
                    !uniqueIngredients.includes(ingredient.category)
                  ) {
                    uniqueIngredients.push(ingredient.category);
                    return uniqueIngredients;
                  }
                  return uniqueIngredients;
                }, [])
                .map((category, j) => (
                  <StyledContainer key={`${j}`}>
                      <StyledIcon
                        iconMenu
                        source={getImageByCategory(category)}
                      />
                  </StyledContainer>
              ))}
            </StyledContainer>
            <StyledText>Aliments</StyledText>
          </StyledContainer>

          {!dish.intoAler.includes("") && dish.intoAler.length > 0 && (
            <StyledContainer center>
              <StyledContainer row>
                {dish.intoAler.map((category, j) => (
                  <StyledContainer key={`${j}`}>
                    <StyledIcon iconMenu source={getImageByCategory(category)} />
                  </StyledContainer>
                ))}
              </StyledContainer>
              <StyledText>Intoleràncies</StyledText>
            </StyledContainer>
          )}
        </StyledContainer>
        <StyledImageBackground/>
      </StyledContainer>
    </StyledContainer>
  );
};

export default DetailsScreen;
