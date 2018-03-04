import React, { Component } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import firebase from 'firebase';

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  login = async () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      console.log(`email ${email}, password ${password}`);
      const loginInfo = firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('info:', loginInfo);
    } catch (err) {
      console.log(err);
    }
    console.log('jälkeen firebasen');
  };

  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          autoCorrect={false}
          placeholder={'Email'}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Text>Password</Text>
        <TextInput
          autoCorrect={false}
          placeholder={'Password'}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button 
          title='Log in'
          onPress={this.login}
        />
      </View>
    );
  }
}

export default Login;
