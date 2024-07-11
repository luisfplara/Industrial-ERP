'use server'


import { ClienteType, addCliente, deleteCliente } from "@/data/cliente";
import { revalidatePath } from "next/cache";

export async function addClientForm (formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)

    const projectPrototype: ClienteType = {
      nome: formJson.nome,
      telefone: formJson.telefone,
      email: formJson.email,
      endereco: formJson.endereco,
    }
    console.log(projectPrototype)

    await addCliente(projectPrototype);

    revalidatePath('/dashboard/administracao/clientes');

  }

  export async function deleteClienteForm (formData: FormData){

    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson)
  
    const docs:string[] = (formJson.docsIds as string).split(',');
    console.log("docs: ", docs)

    const listPromises:Promise<void>[]= []

    docs.forEach((id)=>{
        listPromises.push(deleteCliente(id))
    })
  
    await Promise.all(listPromises);
  
    revalidatePath('/dashboard/administracao/clientes');
  }
