import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from '@react-native-firebase/firestore';
export async function getForumPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'forumPosts'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    throw error;
  }
}
export async function createForumPost(postContent) {
  try {
    const docRef = await addDoc(collection(db, 'forumPosts'), {
      content: postContent,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating forum post:', error);
    throw error;
  }
}
