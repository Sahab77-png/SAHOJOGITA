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
const DiscussionForumScreen = () => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .orderBy('createAt')
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);
  const handlePost = () => {
    db.collection('posts').add({
      text: post,
      createAt: new Date().toISOString(),
      userId: auth.currentUser?.uid || 'anonymous',
    });
    setPost('');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
      <TextInput
        value={post}
        onChangeText={setPost}
        placeholder="Write a post..."
        style={styles.input}
      />
      <Button title="Post" onPress={handlePost} />
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
export default DiscussionForumScreen;
