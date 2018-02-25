import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Main = () => (
  <View style={styles.main}>
    <Text>In main component!</Text>
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});