import AsyncStorage from '@react-native-async-storage/async-storage';
export async function isAuthenticated() {
  const token = await AsyncStorage.getItem('authToken');
  return token !== null;
}
export async function getAuthToken() {
  return await AsyncStorage.getItem('authToken');
}
export async function setAuthToken(token) {
  await AsyncStorage.setItem('authToken', token);
}
export async function clearAuthToken() {
  await AsyncStorage.removeItem('authToken');
}
