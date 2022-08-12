import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../../component/Header';
const MainPage = ({navigation}: {navigation: any}) => {
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
