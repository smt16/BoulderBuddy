// import { ReactNativeFirebase } from '@react-native-firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { FirebaseApp } from '@firebase/app';
// import auth from '@react-native-firebase/auth'

export const signIn = async (app: FirebaseApp, email: string, password: string) => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUser = async (app: FirebaseApp, email: string, password: string) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password);
};
