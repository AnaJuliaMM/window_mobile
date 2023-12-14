// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Window from './components/Window';
import Header from './components/Header';
import PredictionBox from './components/PredictionBox';
import { ApiResponseSensor, ApiResponse, fetchData, fetchSensorsData, retrieveSensorData } from './utils/API';
import Temperature from './components/Temperature';

export default function App() {
  const [predictionApiResponse, setPredictionApiResponse] = useState<ApiResponse[]>([]);
  const [sensorsApiResponse, setSensorsApiResponse] = useState<ApiResponseSensor[]>([]);
  const [uniqueSensor, setUniqueSensor] = useState<ApiResponseSensor | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [latestSensorData, setLatestSensorData] = useState<ApiResponseSensor | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoadingData(true);

        // Fetch prediction and sensor data
        const predictionsApi = await fetchData();
        const sensorsApi = await fetchSensorsData();

        // Update states
        setPredictionApiResponse(predictionsApi);
        setSensorsApiResponse(sensorsApi);

        // Fetch the latest sensor data
        const latestSensor = await retrieveSensorData();
        setLatestSensorData(latestSensor);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    // Call fetchDataFromApi every 500 milliseconds (0.5 seconds)
    const intervalId = setInterval(fetchDataFromApi, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);



  return (
    <LinearGradient colors={['#608DE6', '#7FCED9']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Header />
        <Temperature />
        <Window is_raining={latestSensorData?.is_raining || false} />
        <PredictionBox apiResponse={predictionApiResponse}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingTop: 50,
  },
  innerContainer: {
    height: '100%',
    justifyContent: 'space-around',
  },
});

