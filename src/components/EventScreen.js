import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { db, auth } from '../services/firebase';
const EventScreen = () => {
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('events')
      .orderBy('date')
      .onSnapshot((snapshot) => {
        setEvents(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);
  const handleAddEvent = () => {
    db.collection('events').add({
      event,
      date: new Date(),
      userId: auth.currentUser?.uid,
    });
    setEvent('');
  };
  return (
    <View style={StyleSheet.container}>
      <TextInput
        style={StyleSheet.input}
        placeholder="Enter event name"
        value={event}
        onChangeText={setEvent}
      />
      <Button title="Add Event" onPress={handleAddEvent} />
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  item: { padding: 10, fontSize: 18, height: 40 },
});
export default EventScreen;
