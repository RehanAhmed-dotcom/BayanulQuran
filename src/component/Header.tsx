import React from 'react';

import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const Header = ({navigation, first}: {navigation: any; first: boolean}) => {
  //   console.log('navigation', navigation);
  return (
    <View
      style={{
        backgroundColor: 'skyblue',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 58,
        paddingHorizontal: 15,
      }}>
      {!first && (
        <Icon name="arrowleft" size={20} onPress={() => navigation.goBack()} />
      )}
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        ByanUlQuranDrIsrarAhmed
      </Text>
      <View style={{width: 20}}></View>
    </View>
  );
};
export default Header;
