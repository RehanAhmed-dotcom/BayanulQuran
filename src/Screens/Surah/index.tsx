import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import Header from '../../component/Header';
import {AllSurah} from '../../component/SurahData';
import SoundPlayer from 'react-native-sound-player';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
// import {openDatabase} from 'react-native-sqlite-storage';
import SQlite from 'react-native-sqlite-storage';
// var db = openDatabase({name: 'Quran.db', createFromLocation: 1});
let db;
db = SQlite.openDatabase({name: 'Quran.db', createFromLocation: '~Quran.db'});
const Surah = ({navigation, route}: {navigation: any; route: any}) => {
  const [list, setList] = useState([]);
  const [audio, setAudio] = useState({});
  const [pause, setPause] = useState(true);
  const [arr, setArr] = useState([]);
  const [have, setHave] = useState(false);
  const [mainIndex, setMainIndex] = useState(0);
  const {index, item} = route.params;
  const surahIndex = route.params.index;
  const progress = useProgress();
  const playbackState = usePlaybackState();
  // console.log('audio', audio);
  const run = () => {};
  useEffect(() => {
    console.log('new audio', audio.AudioName);
    if (audio.AudioName) {
      const name = audio.AudioName.slice(0, -4);
      console.log('name', name);
      getInfo();
      SoundPlayer.playSoundFile(`${name}`, 'mp3');
    }
  }, [have]);
  const renderItem = ({item, index}: {item: any; index: any}) => (
    <TouchableOpacity
      onPress={() => {
        setPause(true);
        db.transaction(function (txn) {
          txn.executeSql(
            `SELECT * FROM BayanDetail WHERE SurahID=${surahIndex} AND AyatFrom<=${
              index + 1
            } AND AyatTo>=${index + 1}`,
            [],
            (tx, results) => {
              // alert(results);
              //let datalength = results.row.length;
              // alert(JSON.stringify(results));
              console.log('results', JSON.stringify(results));
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setAudio(temp[0]);

              console.log('temp data', temp);
              setHave(!have);
              setPause(false);
            },
            error => {
              alert('execute error: ' + error.message);
            },
          );
          //.catch(error => alert(error));
          //alert('called');
        });
      }}
      style={{
        width: '90%',
        alignSelf: 'center',
        minHeight: 50,
        marginTop: 10,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
      }}>
      <Text style={{alignItems: 'center', color: 'black', fontWeight: 'bold'}}>
        {index + 1} {item.AyahText}
      </Text>
    </TouchableOpacity>
  );
  // console.log('item', item);
  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('get', info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM Quran WHERE SuraID=${index}`,
        [],
        (tx, results) => {
          // alert(results);
          //let datalength = results.row.length;
          // alert(JSON.stringify(results));
          // console.log('results', JSON.stringify(results));
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setList(temp);
        },
        error => {
          alert('execute error: ' + error.message);
        },
      );
    });
    db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM BayanDetail WHERE SurahID=${surahIndex}`,
        [],
        (tx, results) => {
          // alert(results);
          //let datalength = results.row.length;
          // alert(JSON.stringify(results));
          // console.log('results', JSON.stringify(results));
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setArr(temp);
          setAudio(temp[0]);
          setHave(!have);
          setPause(false);
        },
        error => {
          alert('execute error: ' + error.message);
        },
      );
    });
  }, []);
  // console.log('info', SoundPlayer.getIfo());
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} first={false} />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 18}}>
          سُوْرَۃُ {item.arabic}
        </Text>
        <View style={{height: '75%', width: '100%'}}>
          <FlatList data={list} renderItem={renderItem} />
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
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              height: 50,
              zIndex: 3,
            }}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>{audio.AyatFrom}</Text>
            <View>
              <Progress.Bar progress={progress.position} width={200} />
            </View>
            <Text style={{marginLeft: 10}}>{audio.AyatTo}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setPause(true);
                if (mainIndex > 0) {
                  setAudio(arr[mainIndex - 1]);
                  setHave(!have);
                  setMainIndex(mainIndex - 1);
                  setPause(false);
                  // getnfo();
                } else {
                  alert('No file found');
                }
              }}
              style={{marginRight: 10}}>
              <Icon name="leftcircle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPause(!pause);
                pause ? SoundPlayer.resume() : SoundPlayer.pause();
              }}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={pause ? 'play' : 'pausecircle'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPause(true);
                if (mainIndex + 1 != arr.length) {
                  setAudio(arr[mainIndex + 1]);
                  setHave(!have);
                  setMainIndex(mainIndex + 1);
                  setPause(false);
                } else {
                  alert('No file found');
                }
              }}
              style={{marginLeft: 10}}>
              <Icon name="rightcircle" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Surah;
