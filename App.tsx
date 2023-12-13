import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Window from './components/Window';
import Header from './components/Header';
import PredictionBox from './components/PredictionBox';
import { ApiResponseSensor } from './utils/API';


export default function App() {
  const [data, setData] = useState< ApiResponseSensor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sensorwindow.pythonanywhere.com/api/');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <LinearGradient colors={['#608DE6', '#7FCED9']} style={styles.container}>
       
      <View style={styles.innerContainer}>
        {data ? (
          <View>
            <Header/>
            {/* colocar o componente Temperature aqui */}
            <Window is_raining={data.is_raining} />
            
          </View>
        ) : (
          <Text> Carregando dados...</Text>
        )}
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
