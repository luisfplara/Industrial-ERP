'use server'

import { ClienteType, addCliente, getClientes } from "@/data/cliente"
import { EstoqueType, type ProdutoEstoqueType, addEstoque, addProdutoEstoque, deleteProdutoEstoque } from "@/data/estoque";
import { getOneProduto, getProdutos } from "@/data/produto";
import { revalidatePath } from "next/cache";

export async function addProdutoEstoqueForm (estoqueId:string,formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)
    //const produto = await getOneProduto(formJson.produto)
    const produtoEstoquePrototype: ProdutoEstoqueType = {
      estoqueId,
      produtoId: formJson.produto,
      quantidade: Number(formJson.quantidade),
    }

    await addProdutoEstoque(produtoEstoquePrototype);

    revalidatePath(`/dashboard/administracao/estoque/${estoqueId}`);

  }

  export async function deleteProdutoEstoqueForm (formData: FormData, estoqueId?:string){

    const formJson = Object.fromEntries((formData as any).entries());

    const docs:string[] = (formJson.docsIds as string).split(',');
    console.log("docs: ", docs)

    const listPromises:Promise<void>[]= []

    docs.forEach((id)=>{
        listPromises.push(deleteProdutoEstoque(id))
    })
  
    await Promise.all(listPromises);


    revalidatePath(`/dashboard/administracao/estoque/${estoqueId}`);

  }
