import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import cities from 'cities.json';
// import cities from './constants/cities.json';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {SEASON} from './constants';
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import { max , min} from 'moment';

const WeatherScreen = ({cities}) => {
  const [location, setLocation] = useState('');
  const [currentCity, setCurrentCity] = useState({city: false});
  const [currentWeather, setCurrentWeather] = useState({error : false, loading : true, temp :  0, windSpeed : 0, season :'Sunny day', location: '', time : ''});

  const [date, setDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(false);


    const updateWeather = () =>{
      if(futureDate){
let time =moment(date.getTime()).format('YYYY-MM-DD');
        let api = `https://api.open-meteo.com/v1/forecast?latitude=${currentCity.lat}&longitude=${currentCity.lng}&start_date=${time}&end_date=${time}&daily=temperature_2m_max,weathercode,windspeed_10m_max&timezone=Asia/Kolkata&current_weather=true`;
        setCurrentWeather({...currentWeather, loading : true, error: false});
          axios.get(api).then(res=>{
              setCurrentWeather({loading : false, location : location, windSpeed: res.data.daily.windspeed_10m_max[0], season : res.data.daily.weathercode[0] ? SEASON[res.data.daily.weathercode[0]] : 'Sunny day', temp : res.data.daily.temperature_2m_max[0], time : res.data.daily.time[0], error: false});
              setFutureDate(false);
              setDate(new Date());
          }).catch(e => {setCurrentWeather({ ...currentWeather, error: true, loading: true})
        })

}
else{
        let api = `https://api.open-meteo.com/v1/forecast?latitude=${currentCity.lat}&longitude=${currentCity.lng}&current_weather=true`;
        setCurrentWeather({...currentWeather, loading : true, error: false});
          axios.get(api).then(res=>{
              setCurrentWeather({loading : false, location : location, windSpeed: res.data.current_weather.windspeed, season : res.data.current_weather.weathercode ? SEASON[res.data.current_weather.weathercode] : 'Sunny day', temp : res.data.current_weather.temperature, time : res.data.current_weather.time, error: false});
              setFutureDate(false);
              setDate(new Date());
          }).catch(e => {setCurrentWeather({ ...currentWeather, error: true, loading: true})})
      }
}
  return (
 <View style={styles.container}>

   
   <View>
   <Text style={{color:'white', fontWeight:'bold', fontSize:26, marginTop:20}}>Weather Forecast</Text>
   </View>
   <View style ={{width:"85%", height:'25%', top:'5%', borderColor:'black', borderRadius:10,backgroundColor:'#f6eee6', alignItems:'center', justifyContent:'center'}}>
    {currentWeather.loading === true ? <Text>{currentWeather.error ? 'No Data found': 'Weather Display'}</Text>:(
      <>
   <Text style= {styles.textStyle}>Season : {currentWeather.season ? currentWeather.season : 'Sunny day'}</Text>
   <Text style= {styles.textStyle}>Temperature : {currentWeather.temp} °C</Text>
   <Text style= {styles.textStyle}>WindSpeed  : {currentWeather.windSpeed} kmph</Text>
   <Text style= {styles.textStyle}>Location : {currentWeather.location}</Text>
   <Text style= {styles.textStyle}>Last updated  : {currentWeather.time}</Text>
   </>
    )  }
 
   </View>
   <View style ={{width:"85%", top:'8%',backgroundColor:'#f6eee6', borderColor:'black', borderRadius:10, paddingVertical: 15}}>
    <View style = {{marginVertical:10, marginLeft:10}}>
      <View>
    <TextInput
            style={{
              width: '96.5%',
              borderColor:'black',
              borderWidth:1,
              padding: 8,
              color: 'black',
              fontSize: 15,
            }}
            placeholderTextColor="#818386"
            placeholder="location"
            onChangeText={txt => {
              let selectedCity = cities.filter(city => city.name.toLowerCase() === txt.toLocaleLowerCase());
              if(selectedCity.length ===0){
                setCurrentCity({city: false});
              }
              else{
                setCurrentCity({city: true, ...selectedCity[0]});
              }
              setLocation(txt);

            }}
            // value={}
          />
  <DatePicker style = {{marginVertical:10}} 
  minimumDate ={moment().subtract(7, 'days')} 
  maximumDate ={moment().add(7, 'days')}    date={date} mode ={'date'} onDateChange={(txt) =>{
  setDate(txt);
  setFutureDate(true);
  
  }
  } />
  


          </View>
          <View style ={{width:'100%', top:5, alignItems: 'center'}}>
          <Button
          color = {'#d69936'}
        title="Check Weather"
        onPress={() =>{
          updateWeather();
          }}
      />
       </View>

    </View>
   </View>
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
   alignItems:'center',
   width:'100%',
   flex:1,
backgroundColor:'#202627'
  },

  highlight: {
    fontWeight: '700',
  },
  inputBorder: {
    width: '30%',
    borderRadius: 8,
    borderColor: '#cacaca',
    borderWidth: 1,
    marginBottom: 20,
  },
  textStyle : {
    color:'black', 
    fontWeight:'bold'
  },
});

export default WeatherScreen;
