import { ClienteForm } from "@/components/forms/clienteForm/clienteForm";
import { getOneCliente } from "@/data/cliente";
import { Cliente } from "@/types/cliente";
import React, { useEffect, useState } from "react";
import { editClient, newClient } from "./actions";

export default async function Page({
  params,
}: {
  params: { id: string }
}): Promise<React.JSX.Element> {

  const id = params.id;

  const clienteData = id != "new" ? await getOneCliente(id) : null;

  const cliente = { id: clienteData?.id, ...clienteData?.data() } as Cliente;
  console.log('clientecliente:-> ', cliente);
  return <>
    {<ClienteForm
      openMode={clienteData ? "view" : "new"}
      editClientSA={editClient}
      newClientSA={newClient}
      defaultValues={clienteData ? cliente : { tipoPessoa: "fisica" }}
    />}
  </>
}