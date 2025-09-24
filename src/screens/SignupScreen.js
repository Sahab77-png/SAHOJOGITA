import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { auth } from '../services/firebase';
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log('User signed up:', userCredentials.user);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Signup error:', error.message);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Signup" onPress={handleSignup} />
      <Text
        onPress={() => navigation.navigate('Login')}
        style={styles.linkText}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};
SignupScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default SignupScreen;
