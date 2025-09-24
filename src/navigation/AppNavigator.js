import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthScreen from '../components/AuthScreen';
import ChatScreen from '../components/ChatScreen';
import DiscussionForumScreen from '../components/DiscussionForumScreen';
import EventScreen from '../components/EventScreen';
import ProfileScreen from '../components/ProfileScreen';
import ResourceSharingScreen from '../components/ResourceSharingScreen';
import constants from '../config/constants'; //Importing constants.js
console.log('Loaded Constants:', constants);
const Stack = createStackNavigator();
const AppNavigator = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <Stack.Navigator initialRouteName={user ? 'Home' : 'Auth'}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen
            name="DiscussionForum"
            component={DiscussionForumScreen}
          />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="ResourceSharing"
            component={ResourceSharingScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default AppNavigator;
