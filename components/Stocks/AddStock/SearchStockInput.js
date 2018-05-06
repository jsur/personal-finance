import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import firebase from 'firebase';

export default class SearchStockInput extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.database();
  }

  state = {
    searchText: '',
    searchResult: undefined
  };

  handleTextChange(text) {
    this.setState({ searchText: text },
      () => this.searchStock(this.state.searchText));
  }

  searchStock = async (text) => {
    if (text.length > 0) {
      text = text.toUpperCase();
      const snapshot = await this.db.ref(`stocks/${text}`).once('value');
      console.log(snapshot);
      this.setState({ searchResult: snapshot.val() });
    }
  }

  render() {
    return (
      <View>
        <TextInput 
          style={{ backgroundColor: 'white' }}
          autoCorrect={false}
          value={this.state.searchText}
          onChangeText={searchText => this.handleTextChange(searchText)}
        />
        <TouchableHighlight>
          <Text>{this.state.searchResult ? this.state.searchResult.latestClose : 'No result'}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
