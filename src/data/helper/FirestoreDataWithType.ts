/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments -- ada*/
import { firestoreInstance } from '@/lib/firebase/firebase-config';
import { collection, type QueryDocumentSnapshot, type DocumentData, type FirestoreDataConverter } from 'firebase/firestore';


const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) => snap.data() as T
});

const dataPoint = <T extends DocumentData>(collectionPath: string) =>
    collection(firestoreInstance, collectionPath).withConverter(converter<T>());

export function getCollectionRef <T extends DocumentData>(collectionPath: string) { 
    return dataPoint<T>(collectionPath); }

