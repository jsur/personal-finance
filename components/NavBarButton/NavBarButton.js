import React from 'react';
import { Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

const openMainMenu = (actionId) => {
  Actions[actionId]();
};

const NavBarButton = (props) => (
  <Button
    title={props.title}
    onPress={() => openMainMenu(props.actionId)}
  >
  </Button>
);

NavBarButton.propTypes = {
  title: PropTypes.string,
  actionId: PropTypes.string
};

export default NavBarButton;
