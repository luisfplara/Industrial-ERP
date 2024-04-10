import { getDocs, addDoc, onSnapshot, doc, DocumentReference, DocumentData, getDoc, deleteDoc } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { ProdutoVendaTableData } from '@/app/dashboard/administracao/vendas/novaVenda/addVendasForm';

// Define a generic type for your Firestore documents
export type VendaType = {
  cliente: string,
  produtos: Array<ProdutoVendaTableData>,
  qtdTotalProdutos: number,
  valorTotalVenda: number,
}

export const VendaCollectionRef = getCollectionRef<VendaType>('vendas');

export async function getVendas() {
  return await getDocs(VendaCollectionRef)
}

export async function getOneVenda(id: string) {
  return await getDoc(doc(VendaCollectionRef, id))
}

export async function addVenda(ProdutoData: VendaType) {
  return await addDoc(VendaCollectionRef, ProdutoData);
}

export async function deleteVenda(produtoId: string) {
  const vendaRef = doc(VendaCollectionRef, produtoId)
  return await deleteDoc(vendaRef);
}
