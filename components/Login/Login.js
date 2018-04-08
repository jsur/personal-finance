import React, { Component } from 'react';
import { Alert, Button, Text, View, TextInput } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

  constructor(props) {
    super(props);
    let user = '';
  }

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  async componentWillMount() {
    // firebase auth onAuthStateChanged????
    // https://stackoverflow.com/questions/46011436/what-and-how-to-store-to-keep-users-logged-in-in-a-react-native-app-with-firebas?rq=1
    this.user = await firebase.auth().currentUser;
    console.log(this.user);
    if (this.user !== null) {
      console.log(this.user);
      Actions.popAndPush('mainList');
    }
  }

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

  logout = async () => {
    await firebase.auth().signOut();
  }

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
        <Button 
          title='Logout'
          onPress={this.logout}
        >
        </Button>
      </View>
    );
  }
}

export default Login;
