import React from 'react';
import { Button } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const logout = async () => {
  await firebase.auth().signOut();
  Actions.reset('login');
}

const MainMenu = () => (
  <Button
    title='Logout'
    onPress={logout}
  >
  </Button>
);

export default MainMenu;
