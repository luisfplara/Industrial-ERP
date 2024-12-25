import { getDocs, addDoc, onSnapshot, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { Cliente } from '@/types/cliente';

// Define a generic type for your Firestore documents

export const ClienteCollectionRef = getCollectionRef<Cliente>('clientes');

export async function listenerClientes(callback:()=>void) {
  return onSnapshot(ClienteCollectionRef, callback);
}

export async function getClientes() {
  return await getDocs(ClienteCollectionRef)
}

export async function getOneCliente(id:string) {
  return await getDoc(doc(ClienteCollectionRef, id))
}

export async function addCliente( ClienteData : Cliente) {
  return await addDoc(ClienteCollectionRef, ClienteData);
}

export async function updateCliente( id:string, ClienteData : any) {
  return await updateDoc(doc(ClienteCollectionRef, id), ClienteData);
}

export async function deleteCliente(produtoId: string) {
  const clienteRef = doc(ClienteCollectionRef, produtoId)
  await deleteDoc(clienteRef);
}

