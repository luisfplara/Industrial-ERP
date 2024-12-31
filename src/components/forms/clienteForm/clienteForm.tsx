'use client'
import { FormProvider, useForm } from 'react-hook-form';
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

export const ClienteForm = ({ defaultValues, onSubmit, openMode }: { defaultValues?: Partial<Cliente>, onSubmit: (data: Cliente) => void, openMode: "new" | "view" | "edit" }) => {
  const methods = useClienteForm(defaultValues);
  const router = useRouter();

  const [mode, setMode] = useState<"new" | "view" | "edit">(openMode);
  console.log("openMode: ", mode);
  return (

    <FormProvider {...methods}>
      {mode == "new" && <Typography variant="h2">Novo Cliente</Typography>}
      {mode == "view" && <Typography variant="h2">Vizualizar Cliente</Typography>}
      {mode == "edit" && <Typography variant="h2">Editar Cliente</Typography>}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
