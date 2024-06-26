// @ts-nocheck

import {Svg, Path} from "react-native-svg";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

//background svg which will create space
 const TabBg = ({ color = '#FFFFFF', ...props }) => {
    return (
      <Svg width={75} height={61} viewBox="0 0 75 61" {...props}>
        <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill={color}
        />
      </Svg>
    );
  };
  
  //custom tabBarButton
  const TabBarAdvancedButton = ({ bgColor, ...props }) => {
    return (
      <View style={styles.container} pointerEvents="box-none">
        <TabBg color={bgColor} style={styles.background} />
        <TouchableOpacity
          style={styles.button}
          onPress={props.onPress}>
        </TouchableOpacity>
      </View>
    );
  };
  const styles = StyleSheet.create({
  container: {
      position: 'relative',
      width: 75,
      alignItems: 'center'
    },
    background: {
      position: 'absolute',
      top: 0,
    },
    button: {
      top: -22.5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 27,
      backgroundColor: '#E94F37',
    },
    buttonIcon: {
      fontSize: 16,
      color: '#F6F7EB'
    }
  });
  
  