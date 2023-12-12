import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

interface WindowProps {
  is_raining: boolean;
}

export default function Window({ is_raining }: WindowProps) {
    const [isRaining, setIsRaining] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status da janela:</Text>
      {is_raining ? (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/opened_window.png')}
            style={styles.image}
          />
          <Text style={styles.statusText}>Aberta</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/closed_window.png')}
            style={styles.image}
          />
          <Text style={styles.statusText}>Fechada</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
