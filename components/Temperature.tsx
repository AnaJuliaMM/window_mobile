import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface WeatherData {
  city_id: number;
  city_name: string;
  country: string;
  date: string;
  date_br: string;
  humidity: number;
  id: number;
  precipitation: number;
  pressure: number;
  state: string;
  temperature: number;
  wind_direction: string;
  wind_direction_degrees: number | null;
  wind_gust: number;
  wind_velocity: number;
}

export default function Temperature() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getCurrentTimeInBrazil = () => {
    const now = new Date();
    const offset = -7;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData[]>('http://sensorwindow.pythonanywhere.com/api/previsao/');
        const data: WeatherData[] = response.data;

        if (data.length > 0) {
          const currentDate = getCurrentTimeInBrazil();
          const currentHour = currentDate.getHours();

          // Filtra apenas os dados futuros
          const futureData = data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate > currentDate;
          });

          // Ordena os dados futuros pelo horário mais próximo
          const sortedData = futureData.sort((a, b) => {
            const diffA = Math.abs(currentHour - new Date(a.date).getHours());
            const diffB = Math.abs(currentHour - new Date(b.date).getHours());
            return diffA - diffB;
          });

          // Pega o dado mais próximo
          const closestData = sortedData[0];

          setWeatherData(closestData);
          console.log(closestData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const renderWeatherIcon = () => {
    if (!weatherData) {
      return null;
    }
  
    const { humidity, wind_velocity } = weatherData;
    const currentHour = new Date(weatherData.date).getHours();
  
    // Lógica para determinar o estado do tempo com base nas condições
    if (humidity > 80) {
      // Chuva
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Chuva</Text>
          <Image source={require('../assets/raincloud.png')} style={styles.icon} />
        </View>
      );
    } else if (humidity >= 70 && humidity <= 79) {
      // Nublado
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Nublado</Text>
          <Image source={require('../assets/cloud.png')} style={styles.icon} />
        </View>
      );
    } else if (humidity > 80 && wind_velocity > 30) {
      // Tempestade
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Tempestade</Text>
          <Image source={require('../assets/storm.png')} style={styles.icon} />
        </View>
      );
    } else if (currentHour >= 6 && currentHour < 18) {
      // Ensolarado
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Ensolarado</Text>
          <Image source={require('../assets/sun.png')} style={styles.icon} />
        </View>
      );
    } else {
      // Noite
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Noite</Text>
          <Image source={require('../assets/moon.png')} style={styles.icon} />
        </View>
      );
    }
  };

  return (
    <View style={styles.header}>
      {weatherData && (
        <>
          <Text style={styles.text}>{weatherData.temperature}º</Text>
          {renderWeatherIcon()}
          <View style={styles.state}>
            <Text style={styles.stateName}>Umidade:</Text>
            <Text style={styles.humidity}>{weatherData.humidity}%</Text>
          </View>
        </>
      )}
      {/* Restante do componente permanece o mesmo */}
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
    fontSize: 120,
    color: 'white',
    fontFamily: 'sans-serif',
    marginTop: -30,
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
  state: {
    flexDirection: 'row',
    width: 135,
    justifyContent: 'space-between',
  },
  stateName: {
    width: 97,
    fontSize: 14,
    textAlign: 'center',
  },
  humidity: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  }
});