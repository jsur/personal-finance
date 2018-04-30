import React from 'react';
import { 
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const MainListItem = (props) => (
  <TouchableWithoutFeedback
    onPress={Actions[props.item.key]}
  >
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