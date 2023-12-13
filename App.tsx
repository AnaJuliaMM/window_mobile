import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Window from './components/Window';
import Header from './components/Header';
import PredictionBox from './components/PredictionBox';
import { ApiResponseSensor } from './utils/API';
import { fetchData, fetchSensorsData, retrieveSensorData, ApiResponse } from './utils/API'


export default function App() {
  const [predictionApiResponse, SetPredictionApiResponse] = useState< ApiResponse[] >([]);
  const [sensorsApiResponse, SetSensorsApiResponse] = useState<ApiResponseSensor [] >([]);
  const [uniqueSensor, setUniqueSensor] = useState< ApiResponseSensor | null>(null);
  const [isloadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState< ApiResponseSensor | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoadingData(true)
        const predictionsApi = await fetchData()
        const sensorsApi = await fetchSensorsData()
        const uniqueSensor =  await retrieveSensorData(15)
        SetPredictionApiResponse(predictionsApi)
        SetSensorsApiResponse(sensorsApi)
        setUniqueSensor(uniqueSensor)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoadingData(false)
      }
    };

    fetchDataFromApi();
  }, []);


  return (
    <LinearGradient colors={['#608DE6', '#7FCED9']} style={styles.container}>
       
      <View style={styles.innerContainer}>
        <Header/>
        {/* colocar o componente Temperature aqui */}
        <Window is_raining={uniqueSensor.is_raining} />
        <PredictionBox/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    height: '100%',
    justifyContent: 'space-around',
  },
});



// Código removido
// {data ? (
//   <View>

//     {/* colocar o componente Temperature aqui */}
    
//   </View>
// ) : (
//   <Text> Carregando dados...</Text>
// )}