'use server'

import { addCliente, deleteCliente, updateCliente, getOneCliente } from "@/data/cliente";
import type { Cliente } from "@/types/cliente";
import { Endereco } from "@/types/endereco";
import { revalidatePath } from "next/cache";

export async function editClient(newCliente: Partial<Cliente>): Promise<void> {
  await updateCliente(newCliente.id || '', newCliente)
  revalidatePath('/dashboard/administracao/clientes');
}

export async function newClient(cliente: Cliente): Promise<void> {
  console.log("cliente--> ",cliente);
  await addCliente(cliente);
  revalidatePath('/dashboard/administracao/clientes');

}