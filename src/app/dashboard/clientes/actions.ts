'use server'

import { addCliente, deleteCliente, updateCliente , getOneCliente} from "@/data/cliente";
import type { Cliente } from "@/types/cliente";
import { revalidatePath } from "next/cache";

export async function newClient(cliente: Cliente):Promise<void> {
  await addCliente(cliente);
  revalidatePath('/dashboard/administracao/clientes');

}

export async function editClient(oldCliente: Cliente, newCliente: Cliente):Promise<void> {
  console.log('1233124124 testandooo ');

  const differences: Partial<Cliente> = {};
  console.log('old ---------> : ', oldCliente);
  console.log('new ---------> : ', newCliente);
  for (const key in newCliente) {
    const typedKey = key as keyof Cliente;

    if (typedKey === "tipoPessoa") {
      // Explicit check for "tipoPessoa" with strict typing
      if (oldCliente.tipoPessoa !== newCliente.tipoPessoa) {
        differences.tipoPessoa = newCliente.tipoPessoa;
      }
    } else if (typedKey === "dadoEndereco") {
      differences[typedKey] = newCliente[typedKey];
    }else if (oldCliente[typedKey] !== newCliente[typedKey]) {
      differences[typedKey] = newCliente[typedKey];
    }
  }

  for (const key in oldCliente  ) {
    const typedKey = key as keyof Cliente;

    if (typedKey === "tipoPessoa") {
      // Explicit check for "tipoPessoa" with strict typing
      if (oldCliente.tipoPessoa !== newCliente.tipoPessoa) {
        differences.tipoPessoa = newCliente.tipoPessoa;
      }
    }else if (typedKey === "dadoEndereco") {
      differences[typedKey] = newCliente[typedKey];
    } else if (oldCliente[typedKey] !== newCliente[typedKey]) {
      differences[typedKey] = newCliente[typedKey]||'';
    }
  }

  console.log('differencesdifferencesdifferences: ',differences);
 await updateCliente(oldCliente?.id||'', differences )


  revalidatePath('/dashboard/administracao/clientes');

}

export async function deleteClienteForm(formData: FormData):Promise<void> {

  // const formJson = Object.fromEntries((formData as any).entries());
  // console.log(formJson)

  // const docs: string[] = (formJson.docsIds as string).split(',');
  // console.log("docs: ", docs)

  // const listPromises: Promise<void>[] = []

  // docs.forEach((id) => {
  //   listPromises.push(deleteCliente(id))
  // })

  // await Promise.all(listPromises);

  // revalidatePath('/dashboard/administracao/clientes');
}

import cidades from "@/data/assets/cidades.json"
import estado from "@/data/assets/estados.json"
import { Cidade } from "@/types/cidade";
import { Estado } from "@/types/estado";
import { DocumentSnapshot } from "firebase/firestore";

export async function getCidadeList(uf: string):Promise<Cidade[]> {
  const ufId:Estado[]= estado.filter(
    function(data){ return data.uf == uf })

  return cidades.filter(
    function(data){ return data.id == ufId[0]?.id }
);

}