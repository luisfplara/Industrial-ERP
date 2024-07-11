import { getDocs, addDoc, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';

// Define a generic type for your Firestore documents
export interface ProdutoType {
  nome: string,
  unidade: string,
  volume: number,
  valor: number,
}

export const ProdutoCollectionRef = getCollectionRef<ProdutoType>('produtos');

export async function listenerProdutos(callback: () => void) {
  onSnapshot(ProdutoCollectionRef, callback);
}

export async function getProdutos() {
  return await getDocs(ProdutoCollectionRef)
}

export async function getOneProduto(id: string) {
  return await getDoc(doc(ProdutoCollectionRef, id))
}

export async function addProduto(ProdutoData: ProdutoType) {
  return await addDoc(ProdutoCollectionRef, ProdutoData);
}

export async function deleteProduto(produtoId: string) {
  const produtoRef = doc(ProdutoCollectionRef, produtoId)
   await deleteDoc(produtoRef);
}
