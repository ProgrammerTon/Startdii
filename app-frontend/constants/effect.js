// const styles = {
//     shadow: {
//       backgroundColor: '#fff',
//       padding: 20,
//       margin: 20,
//       borderRadius: 10,
//       // Shadow for iOS
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//       // Shadow for Android
//       elevation: 5,
//     },
//   };

//   export default styles;

import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2'; // Ensure this library is installed
import styles from './styles'; // Adjust the path to your styles file

const ShadowBox = () => (
  <Shadow
    distance={8} // Blur effect
    startColor="rgba(145, 145, 145, 0.25)" // #919191 color with 25% opacity
    offset={[0, 0]} // Shadow offset (x, y)
  >
    <View style={styles.box}>
      <Text>Shadow Effect Example</Text>
    </View>
  </Shadow>
);

export default ShadowBox;