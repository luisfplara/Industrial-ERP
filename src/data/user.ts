 

import {   doc,  deleteDoc,   setDoc,  getDoc, type DocumentSnapshot, updateDoc} from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { type User } from '@/types/user';

// Define a generic type for your Firestore documents

const UserCollectionRef = getCollectionRef<User>('user');

export async function getUser(userId: string) : Promise<DocumentSnapshot<User>>{
  return getDoc(doc(UserCollectionRef,userId))
}

export async function addNewUser(user: User):Promise<void>{
  return setDoc(doc(UserCollectionRef, user.id), user);
}

export async function deleteUser(userId: string):Promise<void> {
  const userRef = doc(UserCollectionRef, userId)
  return deleteDoc(userRef);
}

export async function updateUser(userId: string, user: User):Promise<void>{
  return updateDoc(doc(UserCollectionRef, userId), user);
}
const userFirebase = {
  getUser,
  addNewUser,
  deleteUser,
  updateUser
}

export default userFirebase;