import { ImageBackground, StyleSheet, Dimensions } from 'react-native'

export const StyledImageBackground = ({ className }) => {
    const opacity = className === 'Welcome' ? 1 : 0.3;

    return(
        <ImageBackground
            style={[styles.background, {opacity, zIndex: -1}]}
            source={require('../assets/icons/leavesBackground_02.png')}
        />
    )}

const styles = StyleSheet.create({
    background: {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2
    }
  });