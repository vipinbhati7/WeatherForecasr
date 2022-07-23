import React, { useEffect } from 'react';
import WeatherScreen from './src/WeatherScreen';
import cities from './src/constants/cities.json'


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
 
 return (
 <View style={styles.container}>
   <WeatherScreen cities = {cities}/>
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
   alignItems:'center',
   justifyContent:'center',
   flex:1,
   backgroundColor:'blue'
  },

  highlight: {
    fontWeight: '700',
  },

});

export default App;
