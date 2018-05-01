import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { getQuotes  } from '../../services/stock-data.service';

class Stocks extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
    quotes: undefined
  }

  allQuotes = async () => {
    const quotes = await getQuotes(['KESKOB']);
    this.setState({ loading: false, quotes });
  }

  componentWillMount() {
    this.allQuotes();
  }

  render() {

    if (this.state.loading) {
      return (
        <Text>Loading stocks...</Text>
      );
    }

    return (
      <View>
        <Text>At perse stocks!</Text>
        <Text>{ this.state.quotes ? this.state.quotes[0].symbol : '' }</Text>
      </View>
    );
  }

}

export default Stocks;