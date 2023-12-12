import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Prediction from './Prediction'

export default function PredictionBox() {
  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
            <Text style={{fontSize: 13}}>PREDIÇÃO HORÁRIA</Text>
            <Image
                source={require('../assets/setting.png')}
                style={{ width: 22, height: 22 }}/>
        </View>
        <View style={styles.predictions}>
            <Prediction shift='Agora' hour={10} prediction={17}/>
            <Prediction shift='Tarde' hour={13} prediction={22}/>
            <Prediction shift='Noite' hour={18} prediction={14}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        height: 134,
        width: 323,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        borderRadius: 5,
        padding: 10
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    predictions:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'


    }

})