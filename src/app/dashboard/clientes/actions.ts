'use server'

import { addCliente, deleteCliente, updateCliente } from "@/data/cliente";
import type { Cliente } from "@/types/cliente";
import { revalidatePath } from "next/cache";

export async function addClient(cliente: Cliente):Promise<void> {
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
    } else if (oldCliente[typedKey] !== newCliente[typedKey]) {
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
