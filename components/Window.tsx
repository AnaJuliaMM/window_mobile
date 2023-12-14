import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

interface WindowProps {
  is_raining: boolean;
}

export default function Window({ is_raining }: WindowProps) {
    const [isRaining, setIsRaining] = React.useState(false);
  return (
    <View style={styles.container}>
      {is_raining ? (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/closed_window.png')}
            style={styles.image}
          />
          <Text style={styles.statusText}>Janela Fechada | Chovendo! </Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/opened_window.png')}
            style={styles.image}
          />
          <Text style={styles.statusText}>Janela Aberta | Não está chovendo!  </Text>
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
    fontWeight:'bold',
    fontSize: 18,
    paddingBottom: 10
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  statusText: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 18,
    paddingBottom: 20
  },
});
