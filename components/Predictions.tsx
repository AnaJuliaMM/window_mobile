import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Predictions() {
  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
            <Text>PREDIÇÃO HORÁRIA</Text>
            <Image
                source={require('../assets/setting.png')}
                style={{ width: 22, height: 22 }}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        height: 134,
        width: 323,
        backgroundColor: '#fff',
        opacity: 0.45,
        borderRadius: 5,
        padding: 10
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    

})