import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from '@react-native-firebase/firestore';
export async function getResources() {
  try {
    const querySnapshot = await getDocs(collection(db, 'resources'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
}
export async function addResource(resourceData) {
  try {
    const docRef = await addDoc(collection(db, 'resources'), resourceData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding resource:', error);
    throw error;
  }
}
