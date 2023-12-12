import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PredictionInterface{
    shift: string, 
    hour: number,
    prediction: number
}
export default function Prediction({shift, hour, prediction}: PredictionInterface) {
  return (
    <View style={styles.wrapper}>
      <Text style={{fontSize: 12}}>{shift}</Text>
      <Text style={{fontSize: 11}}>{hour}h</Text>
      <Text style={{fontSize: 11}}>{prediction}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        width: 33,
        height: 73,
        alignItems: 'center'
    }

})