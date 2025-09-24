import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { db, auth } from '../services/firebase';
const ChatScreen = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        setMessageList(snapshot.docs.map((doc) => doc.data()));
      });
    return () => unsubscribe();
  }, []);
  const handleSend = () => {
    if (currentMessage.trim() === '') return;
    db.collection('messages').add({
      text: currentMessage,
      createedAt: new Date(),
      userId: auth.currentUser?.uid || 'unknown',
    });
    setCurrentMessage('');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messageList}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        placeholder="Type a message"
        value={currentMessage}
        onChangeText={setCurrentMessage}
        style={styles.input}
      />
      <Button title="Send" onPress={handleSend} />
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
export default ChatScreen;
