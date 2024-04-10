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
  estoqueId:string,
  quantidade: number,
}

export const estoqueCollectionRef = getCollectionRef<EstoqueType>('estoque');
export const produtoEstoqueCollectionRef = getCollectionRef<ProdutoEstoqueType>('produtosEstoque');

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

export async function getProdutosEstoque() {
  return await getDocs(produtoEstoqueCollectionRef)
}

export async function getProdutosFromEstoque(estoqueId: string) {
  return await getDocs(query(produtoEstoqueCollectionRef, where("estoqueId", "==", estoqueId)))
}


export async function addProdutoEstoque(produtoEstoqueData: ProdutoEstoqueType) {

  return await addDoc(produtoEstoqueCollectionRef, produtoEstoqueData);
}

export async function deleteProdutoEstoque(produtoEstoqueId: string) {

  const produtoEstoqueRef = doc(produtoEstoqueCollectionRef, produtoEstoqueId)
  return await deleteDoc(produtoEstoqueRef);

}




