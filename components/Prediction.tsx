import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ApiResponse } from '../utils/API'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

interface PredictionInterface{
    prediction: ApiResponse
}
export default function Prediction({prediction}: PredictionInterface) {
    const { humidity, wind_velocity } = prediction;
    const hour = new Date(prediction.date).getHours();



    const renderWeatherIcon = () => {
        if (humidity > 80) 
            return <FontAwesome5 name="cloud-rain" size={24} color="white" />
        else if (humidity >= 70 && humidity <= 79) 
            return <FontAwesome name="cloud" size={24} color="white" />
        else if (humidity > 80 && wind_velocity > 30) 
            return <Ionicons name="ios-thunderstorm-sharp" size={24} color="white" />
        else if (hour >= 6 && hour < 18) 
            return <Ionicons name="sunny-sharp" size={24} color="white" />
        else 
            return <Ionicons name="ios-moon-sharp" size={24} color="white" />     
    }   


  return (
    <View style={styles.wrapper}>
        <Text style={{fontSize: 15, color: 'white'}}>{hour == 10? 'Manhã': hour == 13? 'Tarde' : 'Noite'}</Text>
        <Text style={{fontSize: 13, color: 'white'}}>{hour}h</Text>
        {renderWeatherIcon()}
        <Text style={{fontSize: 17,  color: 'white'}}>{prediction.temperature}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 4,
    },
    icon: {
        width: 30,
        height: 30,
        
    }

})