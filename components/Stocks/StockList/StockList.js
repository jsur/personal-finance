import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import StockListItem from './StockListItem';

const StockList = (props) => (
  <View>
    <Text>My stocks</Text>
    {
      props.quotes.map((item, i) => <StockListItem quote={item} key={i} />)
    }
  </View>
);

StockList.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    latestOpen: PropTypes.string,
    latestClose: PropTypes.string,
    latestHigh: PropTypes.string,
    latestLow: PropTypes.string
  }))
};

export default StockList;