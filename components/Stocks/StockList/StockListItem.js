import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';


const StockListItem = (props) => (
  <View key={props.quote.symbol}>
    <Text>{props.quote.symbol || 'Getting data failed, trying again.'}</Text>
    <Text>{parseFloat(props.quote.latestClose).toFixed(2) || 'NA'}</Text>
  </View>
);

StockListItem.propTypes = {
  quote: PropTypes.shape({
    symbol: PropTypes.string,
    latestOpen: PropTypes.string,
    latestClose: PropTypes.string,
    latestHigh: PropTypes.string,
    latestLow: PropTypes.string
  })
};

export default StockListItem;