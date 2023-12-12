import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Window from './components/Window';
import Header from './components/Header';
import Predictions from './components/Predictions';

export default function App() {
  const [data, setData] = useState< Response | null>(null);

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
       
      <View style={styles.container}>
        {data ? (
          <View>
            <Header/>
            {/* colocar o componente Temperature aqui */}
            <Window is_raining={data.is_raining} />
            <Predictions/>
            
          </View>
        ) : (
          <Text> Carregando dados...</Text>
        )}

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
