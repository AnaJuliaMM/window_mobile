import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DayPrediction from './components/DayPrediction';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#608DE6', '#7FCED9']}
      style={styles.container}
    >
      <View>
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
