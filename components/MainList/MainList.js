import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList, 
  Dimensions,
  TouchableWithoutFeedback } from 'react-native';
import { MainListItem } from './MainListItem/MainListItem';

const { height, width } = Dimensions.get('window');

export const MainList = (props) => (
  <View>
    <FlatList
      data={props.financetypes}
      renderItem={({item}) => 
        <MainListItem item={item} />
      }
    />
  </View>
);