import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../component/Header';
import {AllSurah} from '../../component/SurahData';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
// import {openDatabase} from 'react-native-sqlite-storage';
import SQlite from 'react-native-sqlite-storage';
// var db = openDatabase({name: 'Quran.db', createFromLocation: 1});
let db;
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
  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };
  const openCB = () => {
    console.log('hellow');
    // db.transaction(function (txn) {
    //   txn.executeSql('SELECT * FROM Quran', [], function (tx, res) {
    //     console.log('res of db', res.rows.length);
    //   });
    // });
  };

  // successCB() {
  //   console.log("SQL executed fine");
  // },
  // useEffect(() => {
  //   db = SQlite.openDatabase(
  //     {
  //       name: 'SQLite',
  //       location: 'default',
  //       createFromLocation: '~SQLite.db',
  //     },
  //     () => {},
  //     error => {
  //       console.log('ERROR: ' + error);
  //     },
  //   );
  //   // db.transaction(function (txn) {
  //   //   txn.executeSql('SELECT * FROM Quran', [], function (tx, res) {
  //   //     console.log('res of db', res.rows.length);
  //   //   });
  //   // });
  // }, []);
  useEffect(() => {
    db = SQlite.openDatabase(
      {name: 'Quran.db', createFromLocation: 1},
      openCB,
      errorCB,
    );
  }, []);
  // const openCB = () => {
  //   // console.log('hello');
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM Quran', [], (tx, results) => {
  //       console.log('data length');
  //     });
  //   });
  // };
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
              setPause(!pause);
              pause ? TrackPlayer.play() : TrackPlayer.pause();
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={pause ? 'play' : 'pause'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Surah;
