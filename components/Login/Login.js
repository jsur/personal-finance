import React, { Component } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { height, width } from '../../styles/common';

class Login extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    loading: false
  };

  login = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.setState({ loading: false });
      Actions.mainList();
    })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
          this.setState({ loading: false });
          Actions.mainList();
        })
          .catch((err) => {
            alert(err);
          });
      });
  };

  validateLogin = (email, password) => {
    if (!email.includes('@') || email.length === 0) {
      return true;
    }
    if (password.length < 6) {
      return true;
    }
    return false;
  };

  render() {

    const loginDisabled = this.validateLogin(this.state.email, this.state.password);

    return (
      <View style={styles.loginMain}>
        <Text style={styles.inputText} >Email</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Text style={styles.inputText} >Password</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button 
          title='Log in'
          onPress={this.login}
          disabled={loginDisabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginMain: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.15
  },
  input: {
    marginBottom: 25,
    width: width * 0.8
  },
  inputText: {
    marginBottom: 10
  }
});

export default Login;
