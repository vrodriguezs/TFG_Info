import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, Dimensions, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledButton from '../styles/StyledButton'
import StyledIcon from '../styles/StyledIcon'

import { Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../Colors'

import { firebase } from '../../firebase'

// const egg = require('../assets/icons/Preferences/IntoAndAller/egg.png')
// const fructose = require('../assets/icons/Preferences/IntoAndAller/fructose.png')
// const gluten = require('../assets/icons/Preferences/IntoAndAller/gluten.png')
// const lactose = require('../assets/icons/Preferences/IntoAndAller/lactose.png')
// const nuts = require('../assets/icons/Preferences/IntoAndAller/nuts.png')
// const seafood = require('../assets/icons/Preferences/IntoAndAller/seafood.png')

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

// const ModalPopUp = ({visible, children}) => {
//   const [showModal, setShowModal] = useState(visible)
//   useEffect(() => {
//     toggleModal()
//   }, [visible])
//   const toggleModal = () => {
//     if(visible) {
//       setShowModal(true)
//     } 
//     else {
//       setShowModal(false)
//     }
//   }
//   return (
//     <Modal hasBackdrop={true}
//     backdropOpacity={10}
//     backdropColor="black"
//     visible={showModal}>
//       <StyledContainer modalReceipsBack>
//         <StyledContainer modalReceipsCont>
//           {children}
//         </StyledContainer>
//       </StyledContainer>
//     </Modal>
//   )
// }



// const MealModal = ({ visible, meal, dishes, onClose }) => (
//   <ModalPopUp visible={visible}>
//     <StyledContainer center>
//       <StyledText big>{meal}</StyledText>
//       <StyledButton modalX onPress={onClose}>
//         <Octicons name='x' size={40} color={colors.action}/>
//       </StyledButton> 
//     </StyledContainer>
//     <StyledContainer modalReceips>
//       <StyledContainer underlineMeal/>
//       {dishes.map((dish, index) => (
//         <StyledContainer row spaceBetween modalReceips>
//           <StyledContainer row>
//             <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
//               <Text key={index}>{dish.name}</Text>
//               {dish.ingredients && (
//                 <StyledContainer row flexStart>
//                   {dish.ingredients.reduce((uniqueIngredients, ingredient) => {
//                     if (!uniqueIngredients.includes(ingredient.category)) {
//                       uniqueIngredients.push(ingredient.category);
//                     }
//                     return uniqueIngredients;
//                   }, []).map((category, i) => (
//                     <View key={i}>
//                       <StyledIcon iconMenu source={getImageByCategory(category)} />
//                     </View>
//                   ))}
//                 </StyledContainer>
//               )}
//           </StyledContainer>
//           {dish.includeRecipe && <Octicons name={'eye'} size={26} color={colors.action}/>}
//         </StyledContainer>
//       ))}
//     </StyledContainer>
//   </ModalPopUp>
// );


const MenuScreen = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('screen').width

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.x);
  };

  const handlePrevButton = () => {
    scrollViewRef.current?.scrollTo({ x: Math.max(0, scrollPosition - screenWidth), animated: true });
  };
  
  const handleNextButton = () => {
    scrollViewRef.current?.scrollTo({ x: scrollPosition + Dimensions.get('screen').width, animated: true  });
  };
  
  const [menuData, setMenuData] = useState(new Map());

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);
   
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc('User1'); // Update with your user document path
  
        // Get the user document
        const userDoc = await userRef.get();
  
        if (userDoc.exists) {
          const userData = userDoc.data();
  
          // Retrieve the menu data from the user document
          const menuData = userData.menu;
          const menuDataMap = new Map();
  
          menuData.forEach((dayData) => {
            const dayId = dayData.weekId;
            const menu = dayData.menu;
            menuDataMap.set(dayId, menu);
          });
  
          // Set the menuData state with the retrieved data
          setMenuData(menuDataMap);
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
  
    fetchMenuData();
  }, []);
  

  return (
    <StyledContainer flex>
    {menuData ? (
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
                {Object.keys(menuList).map((meal, mealIndex) => (
                  <View key={mealIndex}>
                    <StyledContainer meal>
                      <StyledContainer row spaceBetween userStatsProfile>
                        <StyledText big bold>{meal}</StyledText>
                        <StyledContainer row spaceBetween>
                          <StyledText small colorPlaceholder>{meal.totalKcal}</StyledText>
                          <StyledButton padding onPress={() => {
                            setSelectedMeal(meal);
                            setSelectedDishes(menuList[meal]);
                            setModalVisible(true);
                          }}>
                            <Feather name='edit-2' size={30} color={colors.action} />
                          </StyledButton>
                        </StyledContainer>
                      </StyledContainer>
                      {menuList[meal].map((menu, index) => (
                        <View key={index}>
                          {typeof menu === "string" ? (
                            <Text>{menu}</Text>
                          ) : (
                            Object.entries(menu).map(([key, values], i) => (
                              key === "name" && (
                                <StyledContainer row spaceBetween>
                                  <StyledContainer row>
                                    <StyledContainer row flexStart key={i}>
                                      <StyledButton>
                                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                                      </StyledButton>
                                      <StyledText margin key={i}>{values}</StyledText>
                                      {menu.ingredients && (
                                        <StyledContainer row flexStart>
                                          {menu.ingredients.reduce((uniqueIngredients, ingredient) => {
                                            if (ingredient.hasOwnProperty("category") && !uniqueIngredients.includes(ingredient.category)) {
                                              uniqueIngredients.push(ingredient.category);
                                              return uniqueIngredients;
                                            }
                                            return uniqueIngredients;
                                          }, []).map((category, j) => (
                                            <View key={j}>
                                              <StyledIcon iconMenu source={getImageByCategory(category)} />
                                            </View>
                                          ))}
                                        </StyledContainer>
                                      )}
                                    </StyledContainer>
                                  </StyledContainer>
                                  {menu.includeRecipe && 
                                    <StyledButton>
                                      <Octicons name={'eye'} size={26} color={colors.action}/>
                                    </StyledButton>}
                                </StyledContainer>
                              )
                            ))
                          )}
                        </View>
                      ))}
                      {/* <MealModal
                        visible={modalVisible}
                        meal={selectedMeal}
                        dishes={selectedDishes}
                        onClose={() => setModalVisible(false)}
                      /> */}

                    </StyledContainer>
                  </View>
                ))}
              </ScrollView>
            </StyledContainer>
          </StyledContainer>
        ))}
      </ScrollView>
    ) : (
      <View>
        <Text>LOADING</Text>
      </View>
    )}
      
        
              {/* <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Breakfast</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>370 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>

                <StyledContainer row flexStart>
                  <StyledText margin>Orange Juice</StyledText>
                  <StyledIcon iconMenu source={fruits}/>
                </StyledContainer>
                <StyledContainer row flexStart>
                  <StyledText margin>Ham Toast</StyledText>
                  <StyledIcon iconMenu source={grains}/>
                  <StyledIcon iconMenu source={proteins}/>
                </StyledContainer>            
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Lunch</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>730 kcal</StyledText> 
                    <StyledButton padding onPress={() => setVisible(true)}>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer> 
                </StyledContainer>

                <ModalPopUp visible={visible}>

                  <StyledContainer center>
                    <StyledText big>Lunch Alternatives</StyledText>
                    <StyledButton modalX onPress={() => setVisible(false)}>
                      <Octicons name='x' size={40} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                  
                  <StyledContainer modalReceips>
                    <StyledContainer underlineMeal/>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Chickpea Salad</StyledText>
                        <StyledIcon iconMenu source={legumes}/>
                        <StyledIcon iconMenu source={vegetables}/>
                      </StyledContainer>
                    </StyledContainer>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Goat Cheese Salad</StyledText>
                        <StyledIcon iconMenu source={milkAndDerivatives}/>
                        <StyledIcon iconMenu source={vegetables}/>
                      </StyledContainer>
                    </StyledContainer>
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Tomatoe Salad</StyledText>
                        <StyledIcon iconMenu source={vegetables}/>
                      </StyledContainer>
                    </StyledContainer>
                  </StyledContainer>

                  <StyledContainer modalReceips>
                    <StyledContainer underlineMeal/>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Breaded Chicken Fillets</StyledText>
                        <StyledIcon iconMenu source={proteins}/>
                        <StyledIcon iconMenu source={grains}/>
                      </StyledContainer>
                      <Octicons name={'eye'} size={26} color={colors.action}/>
                    </StyledContainer>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Grilled chicken with rice</StyledText>
                        <StyledIcon iconMenu source={proteins}/>
                        <StyledIcon iconMenu source={grains}/>
                      </StyledContainer>
                      <StyledButton onPress={() => navigation.navigate('Recipes')}>

                        <Octicons name={'eye'} size={26} color={colors.action}/>
                      </StyledButton>
                    </StyledContainer>
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Steak with vegetables</StyledText>
                        <StyledIcon iconMenu source={proteins}/>
                        <StyledIcon iconMenu source={vegetables}/>
                      </StyledContainer>
                      <Octicons name={'eye'} size={26} color={colors.action}/>
                    </StyledContainer>

                  </StyledContainer>

                  <StyledContainer modalReceips>
                    <StyledContainer underlineMeal/>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Greek Yogurt</StyledText>
                        <StyledIcon iconMenu source={milkAndDerivatives}/>
                      </StyledContainer>
                    </StyledContainer>

                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Yogurt with Strawberries</StyledText>
                        <StyledIcon iconMenu source={milkAndDerivatives}/>
                        <StyledIcon iconMenu source={fruits}/>
                      </StyledContainer>
                    </StyledContainer>
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Banana</StyledText>
                        <StyledIcon iconMenu source={fruits}/>
                      </StyledContainer>
                    </StyledContainer>

                  </StyledContainer>
                </ModalPopUp>

                
                <StyledContainer row flexStart>
                  <StyledText margin>Chickpea Salad</StyledText>
                  <StyledIcon iconMenu source={legumes}/>
                  <StyledIcon iconMenu source={fruits}/>
                </StyledContainer>
                <StyledContainer row flexStart>
                  <StyledText margin>Breaded Chicken Fillets</StyledText>
                  <StyledIcon iconMenu source={grains}/>
                  <StyledIcon iconMenu source={proteins}/>
                </StyledContainer>
                <StyledContainer row flexStart>
                  <StyledText margin>Greek Yogurt</StyledText>
                  <StyledIcon iconMenu source={milkAndDerivatives}/>
                </StyledContainer>
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Snack</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>320 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>

                <StyledContainer row flexStart>
                  <StyledText margin>Turkey Sandwich</StyledText>
                  <StyledIcon iconMenu source={grains}/>
                  <StyledIcon iconMenu source={proteins}/>
                </StyledContainer>              
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Dinner</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>390 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>

                <StyledContainer row flexStart>
                  <StyledText margin>Pumpkin purée</StyledText>
                  <StyledIcon iconMenu source={vegetables}/>
                </StyledContainer>
                <StyledContainer row flexStart>
                  <StyledText margin>Chicken Burger</StyledText>
                  <StyledIcon iconMenu source={proteins}/>
                  <StyledIcon iconMenu source={vegetables}/>
                </StyledContainer>            
              </StyledContainer> */}
            {/* </ScrollView> */}

        
    </StyledContainer>
  )
}

export default MenuScreen