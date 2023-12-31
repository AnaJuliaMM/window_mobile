import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

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
          <FontAwesome5 name="cloud-rain" size={24} color="white" />
        </View>
      );
    } else if (humidity >= 70 && humidity <= 79) {
      // Nublado
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Nublado</Text>
          <Ionicons name="cloudy" size={24} color="white" />
        </View>
      );
    } else if (humidity > 80 && wind_velocity > 30) {
      // Tempestade
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Tempestade</Text>
          <Ionicons name="thunderstorm-sharp" size={24} color="white" />
        </View>
      );
    } else if (currentHour >= 6 && currentHour < 18) {
      // Ensolarado
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Ensolarado</Text>
          <Ionicons name="sunny" size={24} color="white" />
        </View>
      );
    } else {
      // Noite
      return (
        <View style={styles.state}>
          <Text style={styles.stateName}>Noite</Text>
          <Ionicons name="moon" size={24} color="black" />
        </View>
      );
    }
  };

  return (
    <View style={styles.main}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',        
    width: '100%',
    height: '30%',
  },
  
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',        
    width: '60%',
    height: '100%',
    padding: 5,
  },
  text: {
    fontSize: 110,
    color: 'white',
    fontFamily: 'sans-serif',
    marginTop: -30,
    paddingLeft: 30
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
    justifyContent: 'space-between'
  },
  stateName: {
    width: 97,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  humidity: {
    fontSize: 16,
    textAlign: 'center',
    color:'white'
  }
});