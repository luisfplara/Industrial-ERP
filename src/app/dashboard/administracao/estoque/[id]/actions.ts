'use server'

import { ClienteType, addCliente, getClientes } from "@/models/cliente"
import { EstoqueType, ProdutoEstoqueType, addEstoque, addProdutoEstoque, deleteProdutoEstoque } from "@/models/estoque";
import { getOneProduto, getProdutos } from "@/models/produto";
import { revalidatePath } from "next/cache";

export async function addProdutoEstoqueForm (estoqueId:string,formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)
    //const produto = await getOneProduto(formJson.produto)
    const produtoEstoquePrototype: ProdutoEstoqueType = {
      estoqueId:estoqueId,
      produtoId: formJson.produto,
      quantidade: +formJson.quantidade,
    }

    await addProdutoEstoque(produtoEstoquePrototype);

    revalidatePath('/dashboard/administracao/estoque/'+estoqueId);

  }

  export async function deleteProdutoEstoqueForm (formData: FormData, estoqueId?:string){

    const formJson = Object.fromEntries((formData as any).entries());

    const docs:Array<string> = (formJson.docsIds as string).split(',');
    console.log("docs: ", docs)

    const listPromises:Array<Promise<void>>= []

    docs.forEach((id)=>{
        listPromises.push(deleteProdutoEstoque(id))
    })
  
    await Promise.all(listPromises);


    revalidatePath('/dashboard/administracao/estoque/'+estoqueId);

  }
