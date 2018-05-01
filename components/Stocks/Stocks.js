import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { getQuotes  } from '../../services/stock-data.service';
import StockList from './StockList/StockList';

class Stocks extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
    quotes: undefined,
    loadFailed: false,
    retryCount: 3
  }

  allQuotes = async () => {
    this.setState({ loadFailed: false, loading: true });
    try {
      const quotes = await getQuotes(['MSFT', 'KESKOB', 'SIILI']);
      if (quotes.status === 503 || this.quotesIncludeUndefined(quotes)) {
        if (this.state.retryCount > 0) {
          this.setState({ retryCount: this.state.retryCount - 1 });
          setTimeout(() => {
            this.allQuotes();
          }, 2000); 
        }
      }
      this.setState({ loading: false, quotes, retryCount: 3 });
    } catch (err) {
      this.setState({ loading: false, loadFailed: true });
    }
  };

  // Alpha Vantage's service often returns partially empty results for some reason
  quotesIncludeUndefined(arr) {
    let flag = false;
    const results = arr.filter(item => item.symbol === undefined);
    if (results.length > 0) {
      flag = true;
    }
    return flag;
  }

  componentWillMount() {
    this.allQuotes();
  }

  render() {

    if (this.state.loading) {
      return (
        // spinner element here
        <Text>Loading stocks...</Text>
      );
    }

    if (
      this.state.loadFailed || 
      (this.state.quotes && this.state.quotes.status === 503)
    ) {
      return (
        <View>
          <Text>Getting stock data from Alpha Vantage failed.</Text>
          <Button
            title='Try again'
            onPress={ this.allQuotes }
          >
          </Button>
        </View>
      );
    }

    return (
      <StockList quotes={this.state.quotes} />
    );
  }

}

export default Stocks;