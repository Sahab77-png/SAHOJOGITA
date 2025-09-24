import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('User logged in:', user);
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.error('Login error:', err);
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to sahojogita !{"\n\n"} 
        Sahojogita makes a difference.{"\n\n"}
         It is a powerful tool to identify and overcome the
         barriers that restrict access to scientific benifits, critical thinking, innovation 
         and equal opportunities.{"\n\n"}
        It also help to identify and combat the unfair forces that spread hatred, create imbalance,
         damage the environment, push parts of the world into extreme poverty, and produce a large number of
          manipulated, dependent, and burdened citizens across the globe.{"\n\n"}
        Let's come together to think with wisdom, discuss or debate with respect, decide with understanding,
        and act with love. Let us build Sahojogita in our families, societies, regions, states, and
        international relations-to break the chains of these unfair forces - for a better world rooted in
         dignity, justice, equality , and creativity. {"\n\n"}
         Sahojogita is a word of the Goalparia culture of Assam. Sahojogita means a dignified form of collaboration
         that neither seeks to dominate nor submits to domination and always upholds the principles of human dignity and
         discipline. {"\n\n"}
        Is Sahojogita a powerful concept to overcome challenges if it is activated collectively,
        or can it have negative impact if it is activated selectively ?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  welcomeText: {
    forntSize:16,
    lineHeight:24,
    marginBottom:20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
export default LoginScreen;
