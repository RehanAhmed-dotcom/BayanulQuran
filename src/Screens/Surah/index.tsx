import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../component/Header';
import {AllSurah} from '../../component/SurahData';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
const Surah = ({navigation}: {navigation: any}) => {
  const renderItem = ({item, index}: {item: any; index: any}) => (
    <TouchableOpacity
      //   onPress={() => navigation.navigate('Surah', {item})}
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
      <Text style={{alignItems: 'center', color: 'black', fontWeight: 'bold'}}>
        {index + 1} {item}
      </Text>
    </TouchableOpacity>
  );
  const [pause, setPause] = useState(true);
  var track = {
    url: require('../../assets/001.mp3'), // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402, // Duration in seconds
  };
  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add(track);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} first={false} />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 18}}>
          سُوْرَۃُ {AllSurah[0].name}
        </Text>
        <View style={{height: '75%', width: '100%'}}>
          <FlatList data={AllSurah[0].ayat} renderItem={renderItem} />
        </View>
        <View
          style={{
            height: '15%',
            width: '90%',
            paddingVertical: 10,
            justifyContent: 'space-between',
            elevation: 3,
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}>
          <Progress.Bar progress={0.3} width={200} />
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.play();
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'play'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Surah;