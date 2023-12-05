import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DayPrediction() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#608DE6', '#7FCED9']}
        style={{ flex: 1, position: 'relative' }}
      >
        <Text style={styles.temperatureText}>17°</Text>
        <View style={styles.rectangle1} />
        <View style={styles.rectangle2}>
          <View style={styles.smallRectangle1} />
          <View style={styles.smallRectangle2} />
          <View style={styles.smallRectangle3} />
        </View>
        <Text style={styles.dateText}>Hoje, dia 14/08/23</Text>
        <Text style={styles.locationText}>Sorocaba</Text>
        <Text style={styles.statusText}>Status da janela:</Text>
        <Text style={styles.minMaxText}>Máx: 25° Mín: 12°</Text>
        <Text style={styles.windowStatusText}>Fechada</Text>
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>Previsão horária</Text>
          <View style={styles.forecastItem}>
            <Text style={styles.forecastTime}>Agora</Text>
            <Text style={styles.forecastTemperature}>17°</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/33x32' }}
              style={styles.forecastImage}
            />
          </View>
          {/* Adicione mais itens de previsão conforme necessário */}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = {
  temperatureText: {
    width: 191,
    height: 146,
    left: 111,
    top: 130,
    color: '#fff',
    fontSize: 160,
  }, 
  rectangle1: {
    width: 157,
    height: 167,
    left: 111,
    top: 415,

  },
  rectangle2: {
    width: 80.41,
    height: 102.52,
    left: 141,
    top: 447.59,
  
  },
  smallRectangle1: {
    width: 77.13,
    height: 99.05,
    left: 3.28,
    top: 1.74,
    backgroundColor: 'black',
    border: '4px white solid',
  },
  smallRectangle2: {
    width: 8.21,
    height: 102.52,
    left: 37.75,
    top: 0,
    backgroundColor: 'white',
  },
  smallRectangle3: {
    width: 8.69,
    height: 80.41,
    left: 0,
    top: 38.23,
    transform: 'rotate(-90deg)',
    transformOrigin: '0 0',
    backgroundColor: 'white',
  },
  dateText: {
    left: 89,
    top: 64,
    color: 'white',
    fontSize: 25.45,
    letterSpacing: 0.25,
    wordWrap: 'break-word',
  },
  locationText: {
    left: 130,
    top: 27,
    color: 'white',
    fontSize: 20.96,
    letterSpacing: 0.21,
    wordWrap: 'break-word',
  },
  statusText: {
    width: 203,
    height: 29,
    left: 125,
    top: 401,
    color: 'white',
    fontSize: 15.66,
    letterSpacing: 0.16,
    wordWrap: 'break-word',
  },
  minMaxText: {
    width: 141,
    height: 17.52,
    left: 121,
    top: 329,
    color: 'white',
    fontSize: 18.68,
    letterSpacing: 0.19,
    wordWrap: 'break-word',
  },
  windowStatusText: {
    width: 78,
    height: 31,
    left: 148,
    top: 568,
    color: 'white',
    fontSize: 18.68,
    letterSpacing: 0.19,
    wordWrap: 'break-word',
  },
  forecastContainer: {
    width: 323,
    height: 134,
    left: 25,
    top: 653,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 5,
  },
  forecastTitle: {
    width: 102,
    height: 10.33,
    left: 12,
    top: 10,
    color: 'black',
    fontSize: 10.11,
    letterSpacing: 0.10,
    wordWrap: 'break-word',
  },
  forecastItem: {
    width: 33,
    height: 73,
    left: 69,
    top: 40,
  },
  forecastTime: {
    width: 26,
    height: 11,
    left: 4,
    top: 0,
    color: 'black',
    fontSize: 8.97,
    letterSpacing: 0.09,
    wordWrap: 'break-word',
  },
  forecastTemperature: {
    width: 15,
    height: 11,
    left: 10,
    top: 62,
    color: 'black',
    fontSize: 11,
    letterSpacing: 0.11,
    wordWrap: 'break-word',
  },
  forecastImage: {
    width: 33,
    height: 32,
    left: 0,
    top: 24,
  },
};
