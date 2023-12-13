import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Prediction from './Prediction'
import { fetchData, ApiResponse } from '../utils/API'

interface PredictionBoxInterface{
    apiResponse:  ApiResponse[],
    loading: boolean
}

export default function PredictionBox({ apiResponse, loading }: PredictionBoxInterface) {
    const hours = [10, 13, 18]



    if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        );
    }


    const filterByHour = (ApiResponse: ApiResponse[], numbers: number[]) => {
        const predictions: ApiResponse[] = []
        hours.forEach(hour=>
            predictions.push(...ApiResponse.filter(
                (prediction)=> new Date(prediction.date).getHours() == hour))
        )
        return predictions
    }


  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold'}}>PREDIÇÃO HORÁRIA</Text>
            <Image
                source={require('../assets/setting.png')}
                style={{ width: 22, height: 22 }}/>
        </View>
        <View style={styles.predictions}>
         
            {filterByHour(apiResponse, hours).map((prediction) =>(
                <Prediction key={prediction.id} hour= {new Date(prediction.date).getHours()} prediction={prediction.temperature}/>
            ) )}
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper:{
        height: 134,
        width: 323,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center'
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    predictions:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 9
    }

})