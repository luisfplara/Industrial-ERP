'use client'
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { PessoaForm } from './pessoaForm';
import { ContatoForm } from './contatoForm';
import { LocalizacaoForm } from './enderecoForm';
import { Cliente, clienteSchema } from '@/types/cliente';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Stack } from '@mui/system';

const useClienteForm = (defaultValues?: Partial<Cliente>) => {
  return useForm<Cliente>({
    resolver: zodResolver(clienteSchema),
    defaultValues: defaultValues || {},
  });
};


export const ClienteForm = ({ defaultValues, editClientSA, newClientSA, openMode }: { defaultValues?: Partial<Cliente> | undefined, editClientSA: (changedValues: Partial<Cliente>) => void, newClientSA: (cliente: Cliente) => void, openMode: "new" | "view" | "edit" }) => {
  const methods = useClienteForm(defaultValues);
  const router = useRouter();

  const { dirtyFields } = useFormState({
    control: methods.control
  });

  const [mode, setMode] = useState<"new" | "view" | "edit">(openMode);
  console.log("openMode: ", mode);

  function editCliente(cliente: Cliente) {
    editClientSA(cliente);
  }

  function newCliente(cliente: Cliente) {
    newClientSA(cliente);
  }

  return (

    <FormProvider {...methods}>
      {mode == "new" && <Typography variant="h2">Novo Cliente</Typography>}
      {mode == "view" && <Typography variant="h2">Vizualizar Cliente</Typography>}
      {mode == "edit" && <Typography variant="h2">Editar Cliente</Typography>}

      <form onSubmit={methods.handleSubmit(mode == "edit" ? editCliente : newCliente)}>
        <PessoaForm isReadOnly={mode == "view"} />
        <ContatoForm isReadOnly={mode == "view"} />
        <LocalizacaoForm isReadOnly={mode == "view"} />
        <Stack direction="row" spacing={2}
          sx={{
            justifyContent: "end",
            alignItems: "center",
            marginTop: 2
          }}>
          <Button variant="outlined" onClick={() => { router.back(); }}>Cancel</Button>
          {mode == "new" && <Button variant="contained" type="submit">Criar</Button>}
          {mode == "view" && <Button variant="contained" onClick={() => setMode("edit")}>Editar</Button>}
          {mode == "edit" && <Button variant="contained" type="submit">Salvar</Button>}
        </Stack>
      </form>
    </FormProvider>
  );
};
