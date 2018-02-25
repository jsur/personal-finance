import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo';

const styles = StyleSheet.create({
    header: {
      flex: 1,
      height: 120,
      width: '100%',
      position: 'absolute',
      top: 30,
    },
    headerContainer: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    headerTextSmall: {
      color: 'white',
      fontWeight: '300',
      fontSize: 20,
      flex: 1,
      textAlign: 'right'
    },

    headerTextBig: {
      fontWeight: '300',
      color: 'white',
      fontSize: 32,
      flex: 1,
      marginLeft: 15,
    },
})

const Header = () => (
  <View style={styles.header}>
    <LinearGradient
      colors={['#2866B4', '#2CB0DE']}
      start={[0, 0]}
      end={[1, 1]}
      style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', height: 120, padding: 20, alignItems: 'center' }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextSmall} >Total</Text>
        <Text style={styles.headerTextBig} >29 878€</Text>
      </View>
    </LinearGradient>
  </View>
);

export default Header;
