import React,{ useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StyledContainer from '../styles/StyledContainer'
import StyledButton from '../styles/StyledButton'
import StyledText from '../styles/StyledText'

import { ageDropdownData, heightDropdownData, weightDropdownData } from '../../FormsData'

import { colors } from '../../Colors'

import { firebase } from '../../firebase'
import { StyledImageBackground } from '../styles/StyledImageBackground'
  
const ProfileScreen = () => {
  const navigation = useNavigation()
  const [userData, setUserData] = useState([]);
  const fieldOrder = ['name', 'age', 'weight', 'height', 'sex', 'exRoutine', 'exIntensity', 'veg', 'dishes', 'email'];
  const fieldTitles = {
    name: 'Nom',
    email: 'Correu',
    exRoutine: 'Rutina d\'exercici',
    exIntensity: 'Intensitat de l\'exercici',
    age: 'Edat',
    height: 'Alçada',
    weight: 'Pes',
    veg: 'Vegà/Vegetarià',
    dishes: 'Àpats',
    sex: 'Sexe'
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = firebase.firestore();
        userId = firebase.auth().currentUser.uid
        const userDocRef = db.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
    
        if (userDoc.exists) {
          const user = userDoc.data();
          const filteredUser = {};
          // Filter out array values
          Object.entries(user).forEach(([key, value]) => {
            if (!Array.isArray(value)) {
              fieldOrder.forEach(field => {
                if (user.hasOwnProperty(field) && !Array.isArray(user[field])) {
                  if (field === 'age') {
                    filteredUser[field] = ageDropdownData.find(option => option.export === user[field])?.label;
                  } else if (field === 'height') {
                    filteredUser[field] = heightDropdownData.find(option => option.export === user[field])?.label;
                  } else if (field === 'weight') {
                    filteredUser[field] = weightDropdownData.find(option => option.export === user[field])?.label;
                  } else {
                    filteredUser[field] = user[field];
                  }
                }
              });
            }
          });

          setUserData([{ data: filteredUser, titles: fieldTitles }]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  

  return (
    <StyledContainer screenMenuContainer>
      <FlatList
        ListHeaderComponent={
          <StyledText tittleTab bold center>Perfil</StyledText>
        }
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator = {false}
        renderItem = {({item}) => (
          <>
          <StyledContainer flexRow userStatsProfile>
            {fieldOrder.map(field => (
              <StyledContainer key={field} row paddingBott={
                  item.titles[field] === 'Sexe' || 
                  item.titles[field] === 'Intensitat de l\'exercici' ||
                  item.titles[field] === 'Àpats'
                }>
                <StyledText label bold>{item.titles[field]}</StyledText>
                <StyledText flex alignRight>{item.data[field]}</StyledText>
              </StyledContainer>
            ))}
          </StyledContainer>
          <StyledContainer underline></StyledContainer>
          </>
        )}
        ListFooterComponent={
          <>
          <StyledButton 
            standard 
            signup 
            onPress={() => navigation.navigate('PersonalData', { arrivedFromProfile: true })}>
            {/*ergo posar un atribut o algo q identifiqui quan es ve d la screen d profile*/}
            <StyledText button bold >Actualitzar</StyledText>
          </StyledButton>
          </>
        }
      />
      <StyledImageBackground/>
    </StyledContainer>
  )

}

export default ProfileScreen