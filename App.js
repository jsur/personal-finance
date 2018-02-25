import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header.js';
import LineChart from './components/Chart.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <LineChart />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
