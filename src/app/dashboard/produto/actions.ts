'use server'

import { ClienteType, addCliente, getClientes } from "@/data/cliente"
import { ProdutoType, addProduto, deleteProduto } from "@/data/produto";
import { revalidatePath } from "next/cache";

export async function addProdutoForm(formData: FormData) {

  const formJson = Object.fromEntries((formData as any).entries());
  const projectPrototype: ProdutoType = {
    nome: formJson.nome,
    unidade: formJson.unidade,
    volume: +formJson.volume,
    valor: +formJson.valor,
  }
  await addProduto(projectPrototype);

  revalidatePath('/dashboard/administracao/produtos');

}

export async function deleteProdutoForm (formData: FormData){

  const formJson = Object.fromEntries((formData as any).entries());

  await deleteProduto(formJson.docsIds);

  revalidatePath('/dashboard/administracao/produtos');

}
