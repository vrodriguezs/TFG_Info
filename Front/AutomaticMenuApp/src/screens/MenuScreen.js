import React, { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, Dimensions, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledButton from '../styles/StyledButton'
import StyledIcon from '../styles/StyledIcon'

import { Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../Colors'

const fruits = require('../assets/icons/Preferences/Fruits/pomes.png')
const grains = require('../assets/icons/Preferences/Grains/bread.png')
const legumes = require('../assets/icons/Preferences/Legumes/chickpeas.png')
const milkAndDerivatives = require('../assets/icons/Preferences/MilkAndDerivatives/milk.png')
const proteins = require('../assets/icons/Preferences/Proteins/chicken.png')
const vegetables = require('../assets/icons/Preferences/Vegetables/leavesAndStems.png')

const egg = require('../assets/icons/Preferences/IntoAndAller/egg.png')
const fructose = require('../assets/icons/Preferences/IntoAndAller/fructose.png')
const gluten = require('../assets/icons/Preferences/IntoAndAller/gluten.png')
const lactose = require('../assets/icons/Preferences/IntoAndAller/lactose.png')
const nuts = require('../assets/icons/Preferences/IntoAndAller/nuts.png')
const seafood = require('../assets/icons/Preferences/IntoAndAller/seafood.png')

const ModalPopUp = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if(visible) {
      setShowModal(true)
    } 
    else {
      setShowModal(false)
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <StyledContainer modalReceipsBack>
        <StyledContainer modalReceipsCont>
          {children}
        </StyledContainer>
      </StyledContainer>
    </Modal>
  )
}

const MenuScreen = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null);

  const handlePrevButton = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };
  
  const handleNextButton = () => {
    scrollViewRef.current?.scrollTo({ x: Dimensions.get('screen').width, animated: true });
  };
  
  const [visible, setVisible] = useState(false)

  return (
    <StyledContainer flex>
      <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
        <StyledContainer page>
          <StyledContainer screenMenuContainer>
            <StyledContainer row spaceBetween>{/* tittle and arrows */}              
              <StyledButton prevDay onPress={handlePrevButton}>
                <Octicons name="chevron-left" 
                          size={50} 
                          style={{color: colors.action}}
                />
              </StyledButton>
              <StyledText tittleTab bold center>Monday</StyledText>
              <StyledButton nextDay onPress={handleNextButton}>
                <Octicons name="chevron-right" 
                          size={50} 
                          style={{color: colors.action}}
                />
              </StyledButton>
            </StyledContainer>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              
              <StyledContainer meal>{/* ----Breakfast---- */}
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

              <StyledContainer meal>{/* ----Lunch---- */}
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Lunch</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>730 kcal</StyledText> 
                    <StyledButton padding onPress={() => setVisible(true)}>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer> 
                </StyledContainer>
                {/* -------------------------------Modal------------------------------- */}
                <ModalPopUp visible={visible}>

                  <StyledContainer center>
                    <StyledText big>Lunch Alternatives</StyledText>
                    <StyledButton modalX onPress={() => setVisible(false)}>
                      <Octicons name='x' size={40} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                  
                  <StyledContainer modalReceips>
                    <StyledContainer underlineMeal/>
                    {/* primer plat */}
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Chickpea Salad</StyledText>
                        <StyledIcon iconMenu source={legumes}/>
                        <StyledIcon iconMenu source={vegetables}/>
                      </StyledContainer>
                    </StyledContainer>
                    {/* alternatives */}
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
                  {/* segon plat */}
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Breaded Chicken Fillets</StyledText>
                        <StyledIcon iconMenu source={proteins}/>
                        <StyledIcon iconMenu source={grains}/>
                      </StyledContainer>
                      <Octicons name={'eye'} size={26} color={colors.action}/>
                    </StyledContainer>
                    {/* alternatives */}
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                        <StyledText margin>Grilled chicken with rice</StyledText>
                        <StyledIcon iconMenu source={proteins}/>
                        <StyledIcon iconMenu source={grains}/>
                      </StyledContainer>
                      <StyledButton onPress={() => navigation.navigate('Recipes')}>
                        {/* s'ha d posar q hi hagi un mètode q faci setVisible(false) i canvii la tab
                        passar x paràmetre el nom d la recepte x quan es faci el canvi d tab */}
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
                  {/* postre */}
                    <StyledContainer row spaceBetween modalReceips>
                      <StyledContainer row>
                        <StyledText margin>Greek Yogurt</StyledText>
                        <StyledIcon iconMenu source={milkAndDerivatives}/>
                      </StyledContainer>
                    </StyledContainer>
                    {/* alternatives */}
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
                {/* -------------------------------Modal------------------------------- */}
                
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

              <StyledContainer meal>{/* ----Snack---- */}
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

              <StyledContainer meal>{/* ----Dinner---- */}
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
              </StyledContainer>
            </ScrollView>
          </StyledContainer>
        </StyledContainer>

        <StyledContainer page>{/* Tuesday */}
          
          <StyledContainer screenMenuContainer>
            <StyledContainer row spaceBetween>
              <StyledButton prevDay onPress={handlePrevButton}>
                <Octicons name="chevron-left"
                          size={50}
                          style={{color: colors.action}}
                />
              </StyledButton>
              <StyledText tittleTab bold center>Tuesday</StyledText>
              <StyledButton nextDay onPress={handleNextButton}>
                <Octicons name="chevron-right"
                          size={50}
                          style={{color: colors.action}}
                />
              </StyledButton>
            </StyledContainer>
          </StyledContainer>
        </StyledContainer>
      </ScrollView>
    </StyledContainer>
  )
}

export default MenuScreen