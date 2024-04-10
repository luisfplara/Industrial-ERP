'use server'

import { ClienteType, addCliente, getClientes } from "@/models/cliente"
import { ProdutoType, addProduto, deleteProduto } from "@/models/produto";
import { VendaType, addVenda } from "@/models/vendas";
import { revalidatePath } from "next/cache";

export async function addVendaForm(venda:VendaType) {



  console.log(venda)
  await addVenda(venda)
  revalidatePath('/dashboard/vendas');

}

export async function deleteProdutoForm (formData: FormData){

  const formJson = Object.fromEntries((formData as any).entries());
  console.log(formJson)


  await deleteProduto(formJson.docsIds);

  revalidatePath('/dashboard/administracao/produtos');

}
