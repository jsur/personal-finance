import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SearchStockInput from './SearchStockInput';

export default class AddStock extends Component {

  constructor(props) {
    super(props);
  }

  state = {

  };

  render() {
    return (
      <View>
        <Text>Search with ticker symbol</Text>
        <SearchStockInput />
      </View>
    );
  }
}
