import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainPage from '../Screens/MainPage';
import SurahList from '../Screens/SurahList';
import Surah from '../Screens/Surah';
const Stack = createStackNavigator();
const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'MainPage'} component={MainPage} />
        <Stack.Screen name={'SurahList'} component={SurahList} />
        <Stack.Screen name={'Surah'} component={Surah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
