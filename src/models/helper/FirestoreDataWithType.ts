import { collection, CollectionReference, QueryDocumentSnapshot, Firestore, DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import { firestoreInstance } from 'lib/firebase-config';

const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) => snap.data() as T
});

const dataPoint = <T extends DocumentData>(collectionPath: string) =>
    collection(firestoreInstance, collectionPath).withConverter(converter<T>());

export function getCollectionRef <T extends DocumentData>(collectionPath: string) { 
    return dataPoint<T>(collectionPath); }

