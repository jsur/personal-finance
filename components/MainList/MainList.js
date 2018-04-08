import React from 'react';
import { 
  View,
  FlatList } from 'react-native';
import { MainListItem } from './MainListItem/MainListItem';

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