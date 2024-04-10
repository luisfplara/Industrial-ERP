import { getDocs, addDoc, onSnapshot, DocumentReference, DocumentData, getDoc, doc, collection, deleteDoc, query, where, collectionGroup } from 'firebase/firestore';
import { getCollectionRef } from './helper/FirestoreDataWithType';
import { ProdutoType } from './produto';

export type EstoqueType = {
  name: string,
  capacidade: number,
  localizacao: string,
}

export type ProdutoEstoqueType = {
  produtoId: string,
  quantidade: number,
}

export const estoqueCollectionRef = getCollectionRef<EstoqueType>('estoque');
export const produtoEstoqueCollectionRef = (estoqueId: string) => getCollectionRef<ProdutoEstoqueType>('/estoque/' + estoqueId + '/produtoestoque')

export async function getEstoques() {
  return await getDocs(estoqueCollectionRef)
}

export async function getOneEstoqueWithReference(id: DocumentReference<EstoqueType, DocumentData>) {
  return await getDoc(id)
}

export async function getOneEstoqueWithId(id: string) {
  return await getDoc(doc(estoqueCollectionRef, id))
}

export async function addEstoque(estoqueData: EstoqueType) {
  return await addDoc(estoqueCollectionRef, estoqueData);
}

export async function deleteEstoque(estoqueId: string) {
  const estoqueRef = doc(estoqueCollectionRef, estoqueId)
  return await deleteDoc(estoqueRef);
}

//-----------

export async function getProdutosEstoque(estoqueId: string) {
  return await getDocs(produtoEstoqueCollectionRef(estoqueId))
}

export async function addProdutoEstoque(estoqueId: string, produtoEstoqueData: ProdutoEstoqueType) {

  return await addDoc(produtoEstoqueCollectionRef(estoqueId), produtoEstoqueData);
}

export async function deleteProdutoEstoque(produtoEstoqueId: string, estoqueId?: string) {
  if (estoqueId) {

    const produtoEstoqueRef = doc(produtoEstoqueCollectionRef(estoqueId), produtoEstoqueId)
    return await deleteDoc(produtoEstoqueRef);
  }
  return
}




