import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ApiResponse } from '../utils/API'

interface PredictionInterface{
    prediction: ApiResponse
}
export default function Prediction({prediction}: PredictionInterface) {
    const { humidity, wind_velocity } = prediction;
    const hour = new Date(prediction.date).getHours();



    const renderWeatherIcon = () => {
        if (humidity > 80) 
            return <Image source={require('../assets/raincloud.png')} style={styles.icon} />
        else if (humidity >= 70 && humidity <= 79) 
            return <Image source={require('../assets/cloud.png')} style={styles.icon} />
        else if (humidity > 80 && wind_velocity > 30) 
            return <Image source={require('../assets/storm.png')} style={styles.icon} />
        else if (hour >= 6 && hour < 18) 
            return <Image source={require('../assets/sun.png')} style={styles.icon} />
        else 
            return <Image source={require('../assets/moon.png')} style={styles.icon} />      
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