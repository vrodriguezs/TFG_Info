import React, { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, Dimensions, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { orderBy } from 'lodash';

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledButton from '../styles/StyledButton'
import StyledIcon from '../styles/StyledIcon'

import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../Colors'

import { firebase } from '../../firebase'
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
    default:
      return require('../assets/icons/Preferences/Vegetables/leavesAndStems.png')
  }
};

const MenuScreen = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('screen').width

  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.x);
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / screenWidth);
    setCurrentPage(page);
  };

  const handlePrevButton = () => {
    scrollViewRef.current?.scrollTo({ x: Math.max(0, scrollPosition - screenWidth), animated: true });
  };
  
  const handleNextButton = () => {
    scrollViewRef.current?.scrollTo({ x: scrollPosition + Dimensions.get('screen').width, animated: true  });
  };
  
  const [menuData, setMenuData] = useState(new Map());

  let intoAler = []
   
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        //agafar l'usuari loguejat
        const db = firebase.firestore();
        userId = firebase.auth().currentUser.uid
        console.log('PATATA ',userId)
        const userRef = db.collection('users').doc(userId);
  
        const userDoc = await userRef.get();
  
        if (userDoc.exists) {
          const userData = userDoc.data();
          
          intoAler = userData.intoAler

          //agafar la informació del menú de l'usuari
          const menuData = userData.weeklyMenu;
          const menuDataMap = new Map();
  
          menuData.forEach((dayData) => {
            const dayId = dayData.weekId;
            const menu = dayData.menu;
            menuDataMap.set(dayId, menu);
          });
  
          //actualitzar l'atribut amb la informació del menú
          setMenuData(menuDataMap);
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
  
    fetchMenuData();
  }, []);

  const similarDishesAlert = (dish) => {
    Alert.alert(
      'Alternatives al plat',
      'Aquí sortiria un plat similar, el que es veu és el mateix que ja hi ha.',
      [
        {
          text: dish.name,
          onPress: () => {
            navigation.navigate('Details', { dish })
          }
        }
      ]
    )
  }

  return (
    <StyledContainer flex>
    {menuData ? (
      <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={1000}
      >
      {Array.from(menuData).map(([day, menuList]) => (
        <StyledContainer page key={day}>
          <StyledContainer screenMenuContainer>
            <StyledContainer row spaceBetween>{/* tittle and arrows */}
              <StyledButton prevDay onPress={handlePrevButton}>
                <Octicons name="chevron-left" size={50} style={{ color: colors.action }} />
              </StyledButton>
              <StyledText tittleTab bold center>{day}</StyledText>
              <StyledButton nextDay onPress={handleNextButton}>
                <Octicons name="chevron-right" size={50} style={{ color: colors.action }} />
              </StyledButton>
            </StyledContainer>

            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              {orderBy(Object.keys(menuList), (meal) => {
                    // Define the desired order of meals
                    const mealOrder = ['Esmorzar', 'Mig Matí', 'Dinar', 'Berenar', 'Sopar'];
                    // Get the index of the current meal in the desired order
                    const mealIndex = mealOrder.indexOf(meal);
                    // Return the index as the sort value
                    return mealIndex === -1 ? Infinity : mealIndex;
                  }).map((meal, mealIndex) => (
                  <StyledContainer key={`${day}-${meal}-${mealIndex}`}>
                  <StyledContainer meal>
                    <StyledContainer row spaceBetween userStatsProfile>
                      <StyledText big bold>{meal}</StyledText>
                      <StyledContainer row spaceBetween>
                        <StyledButton padding onPress={() => {
                          setSelectedMeal(meal);
                          setSelectedDishes(menuList[meal]);
                          setModalVisible(true);
                        }}>
                        </StyledButton>
                      </StyledContainer>
                    </StyledContainer>
                    {menuList[meal].map((dish, index) => {
                      return (
                      <StyledContainer key={`${day}-${meal}-${mealIndex}-${index}`}>
                        {typeof dish === "string" ? (
                          <Text>{dish}</Text>
                        ) : (
                          Object.entries(dish).map(([key, values], i) => (
                            key === "name" && ['Esmorzar', 'Mig Matí', 'Dinar', 'Berenar', 'Sopar'].includes(meal) && (
                            <StyledContainer row spaceBetween key={`${day}-${meal}-${mealIndex}-${index}-${i}`}>
                              <StyledContainer row>
                                <StyledContainer row flexStart>
                                  <StyledButton onPress={() => similarDishesAlert(dish)/*getSimilarDish(dish)*/}>
                                    <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                                  </StyledButton>
                                  <StyledText margin>{values}</StyledText>
                                  {dish.ingredients && (
                                    <StyledContainer row flexStart>
                                      {dish.ingredients.reduce((uniqueIngredients, ingredient) => {
                                        if (ingredient.hasOwnProperty("category") && !uniqueIngredients.includes(ingredient.category)) {
                                          uniqueIngredients.push(ingredient.category);
                                          return uniqueIngredients;
                                        }
                                        return uniqueIngredients;
                                      }, []).map((category, j) => (
                                        <StyledContainer key={`${day}-${meal}-${mealIndex}-${index}-${i}-${j}`}>
                                          <StyledIcon iconMenu source={getImageByCategory(category)} />
                                        </StyledContainer>
                                      ))}
                                    </StyledContainer>
                                  )}
                                </StyledContainer>
                              </StyledContainer>
                              {dish.includeRecipe && 
                                <StyledButton onPress={() => navigation.navigate('Details', { dish })}>
                                  <Octicons name={'info'} size={24} color={colors.action}/>
                                </StyledButton>}
                            </StyledContainer>
                            )
                            ))
                        )}
                      </StyledContainer>
                    )})}
                  </StyledContainer>
                </StyledContainer>
              ))}
            </ScrollView>
          </StyledContainer>
        </StyledContainer>
        ))}
      </ScrollView>
      <StyledImageBackground/>
      </>
    ) : (
      <StyledContainer>
        <Text>LOADING</Text>
      </StyledContainer>
    )}
    </StyledContainer>
  )
}

export default MenuScreen