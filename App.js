import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainContainer } from './components/MainList/MainListReducer';
import { Router, Stack, Scene } from 'react-native-router-flux'
import { Savings } from './components/Savings/Savings';
import { Cryptos } from './components/Cryptos/Cryptos';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key='root'>
            <Scene key='mainList' component={MainContainer} title='My list' />
            <Scene key='savings' component={Savings} />
            <Scene key='cryptos' component={Cryptos} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}