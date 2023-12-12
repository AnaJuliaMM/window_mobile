import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Predictions from './components/Predictions';
import Window from './components/Window';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sensorwindow.pythonanywhere.com/api/chuva/11/');
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
            <Window is_raining={data.is_raining} />
          </View>
        ) : (
          <Text>Carregando dados...</Text>
        )}
        {/* Renderiza o componente Predictions */}
        <Predictions />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
