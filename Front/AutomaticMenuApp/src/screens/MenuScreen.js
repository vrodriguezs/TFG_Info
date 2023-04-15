import React, { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Dimensions, Modal } from 'react-native'

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledButton from '../styles/StyledButton'
import StyledIcon from '../styles/StyledIcon'

import { Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../Colors'

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
            <StyledContainer row spaceBetween>
              <StyledButton prevDay onPress={handlePrevButton}>
                <Octicons name="chevron-left" 
                          size={50} 
                          style={{color: colors.action}}
                />
              </StyledButton>
              <StyledText tittleDay bold center>Monday</StyledText>
              <StyledButton nextDay onPress={handleNextButton}>
                <Octicons name="chevron-right" 
                          size={50} 
                          style={{color: colors.action}}
                />
              </StyledButton>
            </StyledContainer>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Breakfast</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>210 kcal</StyledText> 
                    <StyledButton padding onPress={() => setVisible(true)}>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>
                <StyledContainer underline></StyledContainer>
                <StyledContainer row flexStart>
                  {/* ------------------------------------------------------------------------ */}
                  <ModalPopUp visible={visible}>

                    <StyledButton link onPress={() => setVisible(false)}>
                      <StyledText big>Breakfast Alternatives</StyledText>
                    </StyledButton>
                    
                    <StyledContainer modalReceips>
                      {/* primer plat */}
                      <StyledContainer row spaceBetween modalReceips>
                        <StyledContainer row>
                          <StyledText margin>Orange Juice</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Fruits/citrus.png')}/>
                          <StyledText>-</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/exerciseRoutineDaily.png')}/>
                        </StyledContainer>
                      </StyledContainer>
                      {/* alternatives */}
                      <StyledContainer row spaceBetween modalReceips tab>
                        <StyledContainer row>
                          <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                          <StyledText margin>Apple</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Fruits/pomes.png')}/>
                        </StyledContainer>
                      </StyledContainer>

                      <StyledContainer row spaceBetween modalReceips tab>
                        <StyledContainer row>
                          <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                          <StyledText margin>Macedonia</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Fruits/pomes.png')}/>
                        </StyledContainer>
                        <Octicons name={'eye'} size={26} color={colors.action}/>
                      </StyledContainer>

                    </StyledContainer>
                    {/* segon plat */}
                    <StyledContainer modalReceips>
                      {/* primer plat */}
                      <StyledContainer row spaceBetween modalReceips>
                        <StyledContainer row>
                          <StyledText margin>Ham Toast</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Grains/bread.png')}/>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Proteins/pork.png')}/>
                        </StyledContainer>
                      </StyledContainer>
                      {/* alternatives */}
                      <StyledContainer row spaceBetween modalReceips tab>
                        <StyledContainer row>
                          <MaterialCommunityIcons name={'reload'} size={26} color={colors.action} style={{paddingLeft: 5}}/>
                          <StyledText margin>Turkey Sandwich</StyledText>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Grains/bread.png')}/>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Vegetables/fruits.png')}/>
                          <StyledIcon iconMenu source={require('../assets/icons/Preferences/Proteins/turkey.png')}/>
                        </StyledContainer>
                        <Octicons name={'eye'} size={26} color={colors.action}/>
                      </StyledContainer>

                    </StyledContainer>


                  </ModalPopUp>
                  <StyledText margin>Orange Juice</StyledText>
                  <StyledIcon iconMenu source={require('../assets/icons/Preferences/Fruits/citrus.png')}/>
                  <StyledText>-</StyledText>
                  <StyledIcon iconMenu source={require('../assets/icons/exerciseRoutineDaily.png')}/>
                </StyledContainer>
                <StyledContainer row flexStart>
                  <StyledText margin>Ham Toast</StyledText>
                  <StyledIcon iconMenu source={require('../assets/icons/Preferences/Grains/bread.png')}/>
                  <StyledIcon iconMenu source={require('../assets/icons/Preferences/Proteins/pork.png')}/>
                </StyledContainer>
                <StyledContainer underline></StyledContainer>              
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Lunch</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>540 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer> 
                </StyledContainer>
                <StyledContainer underline></StyledContainer>
                <StyledText margin>Chickpea Salad</StyledText>
                <StyledText margin>Breaded Chicken Fillets</StyledText>
                <StyledText margin>Greek Yogurt</StyledText>
                <StyledContainer underline></StyledContainer>
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold>Snack</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>250 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>
                <StyledContainer underline></StyledContainer>
                <StyledText margin>Turkey Sandwich</StyledText>
                <StyledContainer underline></StyledContainer>
              </StyledContainer>

              <StyledContainer meal>
                <StyledContainer row spaceBetween userStatsProfile>
                  <StyledText big bold >Dinner</StyledText>
                  <StyledContainer row spaceBetween>
                    <StyledText small colorPlaceholder>430 kcal</StyledText> 
                    <StyledButton padding>
                      <Feather name='edit-2' size={30} color={colors.action}/>
                    </StyledButton> 
                  </StyledContainer>
                </StyledContainer>
                <StyledContainer underline></StyledContainer>
                <StyledText margin>Noodle Soup</StyledText>
                <StyledContainer underline></StyledContainer>
              </StyledContainer>
            </ScrollView>
          </StyledContainer>
        </StyledContainer>


        <StyledContainer page>
          {/* Tuesday */}
          <StyledContainer screenMenuContainer>
            <StyledContainer row spaceBetween>
              <StyledButton prevDay onPress={handlePrevButton}>
                <Octicons name="chevron-left"
                          size={50}
                          style={{color: colors.action}}
                />
              </StyledButton>
              <StyledText tittleDay bold center>Tuesday</StyledText>
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