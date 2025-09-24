import { firestore } from '../services/firebase';
import { collection, getDocs, addDoc } from '@react-native-firebase/firestore';
export async function getEvents(userId) {
  if (!userId) return [];
  const eventsRef = collection(firestore, 'users/${userId}/events');
  const snapshot = await getDocs(eventsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export async function createEvent(userId, eventDetails) {
  if (!userId) return null;
  const eventsRef = collection(firestore, 'users/${userId}/events');
  const docRef = await addDoc(eventsRef, ...eventDetails);
  return { id: docRef.id, ...eventDetails };
}
