import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default class SearchStockInput extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    searchText: '',
    searchResult: undefined
  };

  searchStock = () => {
    console.log('tba');
  }

  render() {
    return (
      <View>
        <TextInput 
          style={{ backgroundColor: 'white' }}
          autoCorrect={false}
          value={this.state.searchText}
          onChangeText={searchText => this.setState({ searchText })}
        />
        <Button
          title='Search'
          onPress={this.searchStock}
        ></Button>
        
      </View>
    );
  }
}
