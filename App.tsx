import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DayPrediction from './components/DayPrediction';
import { LinearGradient } from 'expo-linear-gradient';
import TodayPrediction from './components/TodayPrediction';

export default function App() {
  return (
    <LinearGradient
      colors={['#608DE6', '#7FCED9']}
      style={styles.container}
    >
      <View>
          <TodayPrediction city_id='Sorocaba' temperature={17}/>
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
