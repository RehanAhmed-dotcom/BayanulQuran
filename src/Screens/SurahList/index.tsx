import React, {useState} from 'react';

import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../component/Header';
import {arr} from '../../component/SurahData';
const SurahList = ({navigation}: {navigation: any}) => {
  const renderItem = ({item, index}: {item: any; index: any}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Surah', {item, index: index + 1})}
      style={{
        width: '90%',
        alignSelf: 'center',
        height: 50,
        marginTop: 10,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
      }}>
      <Text style={{alignItems: 'center'}}>
        {index + 1} سُوْرَۃُ {item.arabic}
      </Text>
    </TouchableOpacity>
  );
  const {userData} = useSelector(({USER}) => USER);
  // console.log('user in redux', userData);
  const dummy = 3;
  const dummyArr = [3, 5];
  const check = () => {
    console.log('dummy', dummy);
    console.log('dummyarr', dummyArr);
    if (dummyArr.includes(dummy)) {
      return true;
    } else {
      return false;
    }
  };
  console.log('check', check());
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} first={false} />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 18}}>
          Surah
        </Text>
        <View style={{height: '92%', width: '100%'}}>
          <FlatList data={arr} renderItem={renderItem} />
        </View>
      </View>
    </View>
  );
};
export default SurahList;
