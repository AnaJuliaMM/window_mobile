import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default function Temperature() {
  const [weatherState, setWeatherState] = useState('ensolarado');

  const renderWeatherIcon = () => {
    switch (weatherState) {
        case 'ensolarado':
          return (
              <View style={styles.state}>
                  <Text style={styles.stateName}>Ensolarado</Text>
                  <Image source={require('../assets/sun.png')} style={styles.icon} />
              </View>
          )
      case 'nublado':
        return (
            <View style={styles.state}>
                <Text style={styles.stateName}>Nublado</Text>
                <Image source={require('../assets/cloud.png')} style={styles.icon} />
            </View>
        )
      case 'noite':
        return (
            <View style={styles.state}>
                <Text style={styles.stateName}>Noite</Text>
                <Image source={require('../assets/moon.png')} style={styles.icon} />
            </View>
        )
      case 'chuva':
        return (
            <View style={styles.state}>
                <Text style={styles.stateName}>Chuva</Text>
                <Image source={require('../assets/raincloud.png')} style={styles.icon} />
            </View>
        )
      case 'tempestade':
        return (
            <View style={styles.state}>
                <Text style={styles.stateName}>Tempestade</Text>
                <Image source={require('../assets/storm.png')} style={styles.icon} />
            </View>
        )
      default:
        return null;
    }
  };

  const handleWeatherChange = (newState: React.SetStateAction<string>) => {
    setWeatherState(newState);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>72º</Text>
      {renderWeatherIcon()}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleWeatherChange('ensolarado')}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleWeatherChange('nublado')}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleWeatherChange('noite')}>
          <Text>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleWeatherChange('chuva')}>
          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleWeatherChange('tempestade')}>
          <Text>5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 150,
    color: 'white',
    fontFamily: 'sans-serif',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  button: {
    width: 50,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5, // Borda arredondada
    justifyContent: 'center', // Alinha o conteúdo verticalmente no centro
    alignItems: 'center', // Alinha o conteúdo horizontalmente no centro
    borderWidth: 1, // Largura da borda
    borderColor: 'gray', // Cor da borda
    paddingHorizontal: 10, // Espaçamento horizontal interno
  },
  state:{
    flexDirection: 'row',
    width: 115,
    justifyContent: 'space-between',
  },
  stateName:{
    width: 93,
    fontSize: 15,
    marginRight: 20,
    textAlign: 'center',
  },
});
