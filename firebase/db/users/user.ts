import { FirebaseApp } from '@firebase/app';
import { getFirestore, updateDoc, doc, setDoc, getDoc } from '@firebase/firestore';

export interface User {
  email: string,
  username: string
}

export const getUser = async (app: FirebaseApp, email: string) => {
  const db = getFirestore(app);
  const docRef = doc(db, 'users', email);
  return getDoc(docRef);
};

export const insertUser = async (app: FirebaseApp, user: User) => {
  const db = getFirestore(app);
  const docRef = doc(db, 'users', user.email);
  await setDoc(docRef, user);
};

export const updateUser = async (app: FirebaseApp, email: string, data: User) => {
  const db = getFirestore(app);
  const docRef = doc(db, 'users', email);
  await updateDoc(docRef, data as any);
};
