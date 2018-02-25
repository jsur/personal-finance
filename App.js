import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainContainer } from './components/Main/MainListReducer';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}