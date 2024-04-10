import { getDocs, addDoc, onSnapshot, doc, DocumentReference, DocumentData, getDoc, deleteDoc } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';

// Define a generic type for your Firestore documents
export interface ClienteType{
  nome: string,
  telefone: string,
  email: string,
  endereco: string,
}

export const ClienteCollectionRef = getCollectionRef<ClienteType>('clientes');

export async function listenerClientes(callback:()=>void) {
  return onSnapshot(ClienteCollectionRef, callback);
}

export async function getClientes() {
  return await getDocs(ClienteCollectionRef)
}

export async function getOneCliente(id:string) {
  return await getDoc(doc(ClienteCollectionRef, id))
}

export async function addCliente( ClienteData : ClienteType) {
  return await addDoc(ClienteCollectionRef, ClienteData);
}

export async function deleteCliente(produtoId: string) {
  const clienteRef = doc(ClienteCollectionRef, produtoId)
  return await deleteDoc(clienteRef);
}

