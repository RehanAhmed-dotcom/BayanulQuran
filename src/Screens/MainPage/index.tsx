import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../../component/Header';
const MainPage = ({navigation}: {navigation: any}) => {
  // const littleText = 'hello how are you 47';
  // const check = e => {
  //   return littleText.includes(`${e}`);
  // };

  // console.log('check', check('47s'));
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} first={true} />

      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/quran.jpg')}
          style={{height: 250, width: 250, resizeMode: 'contain'}}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SurahList')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 50,
            elevation: 3,
            borderRadius: 10,
            width: '90%',
          }}>
          <Text>Surah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MainPage;
