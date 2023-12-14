import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData[]>('http://sensorwindow.pythonanywhere.com/api/previsao/');
        const data: WeatherData[] = response.data;

        // Imprimir os dados no console para referência
        console.log('Dados da API:', data);

        // Verificar se há algum dado na resposta
        if (data.length > 0) {
          // Obter a data e hora atual
          const currentDate = new Date();
          const currentHour = currentDate.getHours();

          // Encontrar o item correspondente à hora mais próxima
          let closestData = data[0];
          let closestHourDifference = Math.abs(currentHour - new Date(data[0].date).getHours());
          let closestDateDifference = Math.abs(currentDate.getDate() - new Date(data[0].date).getDate());

          data.forEach(item => {
            const hourDifference = Math.abs(currentHour - new Date(item.date).getHours());
            const dateDifference = Math.abs(currentDate.getDate() - new Date(item.date).getDate());

            if (dateDifference < closestDateDifference || (dateDifference === closestDateDifference && hourDifference < closestHourDifference)) {
              closestData = item;
              closestHourDifference = hourDifference;
              closestDateDifference = dateDifference;
            }
          });

          setWeatherData(closestData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    const formattedDate = new Date(dateString).toLocaleString('pt-BR', options);
    return formattedDate.replace(/,/g, ' -');
  };

  return (
    <View style={styles.container}>
      {weatherData && (
        <>
          <Text style={styles.value}>{weatherData.city_name}</Text>
          <Text style={styles.value}>{formatDateTime(weatherData.date_br)}</Text>
        </>
      )}
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    height: 100,
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
  },
});

export default WeatherComponent;
