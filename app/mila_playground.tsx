import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MilaPlayground() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Mila Playground!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
