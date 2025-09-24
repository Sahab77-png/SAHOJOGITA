import { firestore } from '../services/firebase.js';
export async function getChatMessages(chatId) {
  try {
    const messagesRef = firestore
      .collection('chat')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc');
    const snapshot = await messagesRef.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
}
export async function sendMessage(chatId, messageContent) {
  try {
    const messageRef = firestore
      .collection('chat')
      .doc(chatId)
      .collection('message');
    await messageRef.add({
      content: messageContent,
      timestamp: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}
