import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'

import { firebase } from '../../firebase'
import { FlatList } from 'react-native';

import StyledContainer from '../styles/StyledContainer'
import StyledText from '../styles/StyledText'
import StyledTextInput from '../styles/StyledTextInput';
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
    default:
      return;
  }
};

const RecipesScreen = () => {
  const navigation = useNavigation()
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firebase.firestore().collection("dishes").orderBy("name").get();
      setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timerId;
  
    const delaySearch = () => {
      timerId = setTimeout(() => {
        const uniqueDishes = [...dishes].reduce((unique, dish) => {
          if (!unique.find((item) => item.name === dish.name)) {
            unique.push(dish);
          }
          return unique;
        }, []);
        if (search === "") {
          setFilteredDishes(uniqueDishes.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          setFilteredDishes(
            uniqueDishes.filter((dish) =>
              dish.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        }
      }, 500);
    };
  
    delaySearch();
  
    return () => {
      clearTimeout(timerId);
    };
  }, [search, dishes]);
  

  return (
      <StyledContainer screenMenuContainer>
        <StyledText tittleTab bold center>Receptes</StyledText>

        <StyledContainer leftIconSearch>
          <Octicons name={'search'} size={30} color={colors.textPlaceholder}/>
        </StyledContainer>
        <StyledTextInput
          textInputBoxSearch
          placeholder="Escriu una recepta"
          onChangeText={text => setSearch(text)}
        />
        
        <FlatList
          data={filteredDishes}
          keyExtractor={(dish) => dish.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: dish }) => (
            <StyledContainer meal>
              <StyledContainer row>
                <StyledButton
                  onPress={() => navigation.navigate('Details', { dish })}
                >
                  <Octicons name="info" size={24} color={colors.action} />
                </StyledButton>
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
            </StyledContainer>
          )}
        />
        <StyledImageBackground/>
      </StyledContainer>
  );
};

export default RecipesScreen;