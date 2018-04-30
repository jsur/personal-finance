import React from 'react';
import { Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const openMainMenu = () => {
  Actions.mainMenu();
};

const MainListMenuButton = () => (
  <Button
    title='Menu'
    onPress={openMainMenu}
  >
  </Button>
);

export default MainListMenuButton;
