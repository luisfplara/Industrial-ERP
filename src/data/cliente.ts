import { getDocs, addDoc, onSnapshot, doc, getDoc, deleteDoc, updateDoc, query, collection, orderBy, limit, startAfter, getCountFromServer,limitToLast, startAt} from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { Cliente } from '@/types/cliente';

// Define a generic type for your Firestore documents

export const ClienteCollectionRef = getCollectionRef<Cliente>('clientes');

export async function listenerClientes(callback: () => void) {
  return onSnapshot(ClienteCollectionRef, callback);
}

export async function getClientes(pageSize: number, page: number) {
  const baseQuery = pageSize!=-1?query(ClienteCollectionRef, orderBy("displayName"),  limit((page+1) * pageSize)):query(ClienteCollectionRef, orderBy("displayName"));

  if (page === 0) {
    return await getDocs(baseQuery);
  } else {
    // Fetch subsequent pages
    console.log("page * pageSize--> ",page * pageSize)
    const pagedQuery = query(baseQuery,startAt(page * pageSize));
    const documentSnapshots = await getDocs(pagedQuery);
    console.log("documentSnapshots ",documentSnapshots.docs.map((a,b)=>(a.data() as any).nome))
    return documentSnapshots;
  }
}

export async function getClientesCount() {
  const baseQuery = query(ClienteCollectionRef, orderBy("displayName"));
  const snapshot = await getCountFromServer(baseQuery);
  console.log('snapshot---> ', snapshot.data());
  return snapshot.data().count
}

export async function getOneCliente(id: string) {
  return await getDoc(doc(ClienteCollectionRef, id))
}

export async function addCliente(ClienteData: Cliente) {
  return await addDoc(ClienteCollectionRef, ClienteData);
}

export async function updateCliente(id: string, ClienteData: any) {
  return await updateDoc(doc(ClienteCollectionRef, id), ClienteData);
}

export async function deleteCliente(produtoId: string) {
  const clienteRef = doc(ClienteCollectionRef, produtoId)
  await deleteDoc(clienteRef);
}

