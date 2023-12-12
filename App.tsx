import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PredictionBox from './components/PredictionBox';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sensorwindow.pythonanywhere.com/api/chuva/10/'); 
        setData(response.data);
        console.log(data);
        
      } catch (error) {
        console.log(error);
        
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <LinearGradient
      colors={['#608DE6', '#7FCED9']}
      style={styles.container}
    >
      <View> 
          {data ? ( <Text>Dados recebidos: {JSON.stringify(data)}</Text>) : (
           <View> 
           {data !== null ? (
             <Text>
               if(data.is_raining){
                true
            
               }
             </Text>
           ) : (
             <Text>Carregando dados...</Text>
           )}
         </View>
         
          )
          }

      

          {/* // <TodayPrediction city_id='Sorocaba' temperature={17}/> */}
          <PredictionBox></PredictionBox>
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
});
