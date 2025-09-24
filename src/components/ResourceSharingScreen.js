import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { db, auth } from '../services/firebase';
const ResurceSharingScreen = () => {
  const [resource, setResource] = useState('');
  const [resources, setResources] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('resoures')
      .orderBy('createAt')
      .onSnapshot((snapshot) => {
        setResources(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);
  const handleShare = () => {
    db.collection('resoures').add({
      text: resource,
      createAt: new Date(),
      userId: auth.currentUser.uid,
    });
    setResource('');
  };
  return (
    <View style={StyleSheet.container}>
      <FlatList
        data={resources}
        renderItem={([item]) => <Text>{item.text}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        placeholder="Share a resource"
        value={resource}
        onChangeText={setResource}
        style={styles.input}
      />
      <Button title="Share" onPress={handleShare} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});
export default ResurceSharingScreen;
