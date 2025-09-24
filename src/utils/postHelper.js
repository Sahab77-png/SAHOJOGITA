import { firestore } from '../services/firebase';
import { collection,addDoc, Timestamp } from 'firebase/firestore';
export const uploadPostToFirebase = async (Content, user) => {
    const docRef = await addDoc(collection(firestore, 'posts'), {
        Content,
        createedAt: Timestamp.now(),
        author: {
            uid: user.uid,
            name: user.displayName || 'Anonymous'
        }
    });
    return {id: docRef.id, Content };
};