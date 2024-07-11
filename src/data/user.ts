/* eslint-disable @typescript-eslint/no-unsafe-call -- asd*/

import {   doc,  deleteDoc,   setDoc,  getDoc, DocumentSnapshot, } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { User } from '@/types/user';

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
const userFirebase = {
  getUser,
  addNewUser,
  deleteUser
}

export default userFirebase;