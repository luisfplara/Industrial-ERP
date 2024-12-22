'use server'

import { type EstoqueType, addEstoque, deleteEstoque } from "@/data/estoque";
import { revalidatePath } from "next/cache";

export async function addEstoqueForm (formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)

    const estoquePrototype: EstoqueType = {
      name: formJson.nome,
      localizacao: formJson.localizacao,
      capacidade: Number(formJson.capacidade)
    }

    await addEstoque(estoquePrototype);

    revalidatePath('/dashboard/administracao/estoque');

  }

  export async function deleteEstoqueForm (formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)
  
    const docs:string[] = (formJson.docsIds as string).split(',');
    console.log("docs: ", docs)

    const listPromises:Promise<void>[]= []

    docs.forEach((id)=>{
        listPromises.push(deleteEstoque(id))
    })
  
    await Promise.all(listPromises); 
    revalidatePath('/dashboard/administracao/estoque');
  
  }
  
