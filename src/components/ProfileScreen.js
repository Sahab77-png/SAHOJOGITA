import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../services/firebase';
const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => {
    const currentUser = auth.curentUser;
    if (currentUser) {
      setUser(currentUser);
      db.collection('users')
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setName(doc.data().name);
          }
        });
    }
  }, []);
  const handleSave = () => {
    db.collection('users').doc(user.uid).set({ name }, { merge: true });
  };
  return (
    <View style={StyleSheet.container}>
      <Text style={StyleSheet.label}>Email:{user?.email}</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  label: { fontSize: 16, marginBottom: 12 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
export default ProfileScreen;
