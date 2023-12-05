import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface TodayPredictionProp{
    city_id: string,
    temperature: number,
}
export default function TodayPrediction({city_id, temperature}: TodayPredictionProp) {
  return (
    <View style={styles.box}>
      <Text>{city_id}</Text>
      <Text style={styles.temperature}>{temperature}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    box:{
        width: '30%',
        height: '40%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        opacity: 0.8
    },
    temperature:{
        fontSize: 80
    }
})