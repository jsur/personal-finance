import React from 'react';
import { 
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet } from 'react-native';

export const MainListItem = (props) => (
  <TouchableWithoutFeedback>
    <View style={styles.listItem}>
      <Text>{props.item.key}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 150,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  }
});

