'use server'

import { ClienteType, addCliente, getClientes } from "@/models/cliente"
import { ProdutoType, addProduto, deleteProduto } from "@/models/produto";
import { deleteVenda } from "@/models/vendas";
import { revalidatePath } from "next/cache";


export async function deleteVendaForm (formData: FormData){

  const formJson = Object.fromEntries((formData as any).entries());
  console.log(formJson)

  const docs:Array<string> = (formJson.docsIds as string).split(',');
  console.log("docs: ", docs)

  const listPromises:Array<Promise<void>>= []

  docs.forEach((id)=>{
      listPromises.push(deleteVenda(id))
  })

  await Promise.all(listPromises); 
  revalidatePath('/dashboard/administracao/vendas');


}
