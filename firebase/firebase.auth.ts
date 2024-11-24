import app from '@/firebase/firebase.app';
import auth from '@react-native-firebase/auth'

export const fireAuthSignIn = async (email: string, password: string) => {
  return auth(app).signInWithEmailAndPassword(email, password)
};

export const createUser = async (email: string, password: string) => {
  return auth(app).createUserWithEmailAndPassword(email, password);
}
