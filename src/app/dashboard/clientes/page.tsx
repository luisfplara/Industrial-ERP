import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
//import dayjs from 'dayjs';
import { Plus as AddIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import ClientesTable from '@/components/dashboard/clientes/clientes-table';
import { getClientes } from '@/data/cliente';
import AdicionarClienteDialog from '@/components/dashboard/clientes/clientes-adicionar';
import { addClient, editClient } from './actions';
import Link from 'next/link';
import { Cliente } from '@/types/cliente';
import { Fab } from '@mui/material';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;


export default async function Page(): Promise<React.JSX.Element> {

  const clienteData = await getClientes()

  const clienteList: Cliente[] = []

  clienteData.forEach((data) => {
    clienteList.push({ id: data.id, ...data.data() })
  })


  return (
    <Stack spacing={3}>
      <AdicionarClienteDialog submitAction={addClient} editAction={editClient} />
      <Stack direction="row" spacing={3}>
        <Typography variant="h4">Clientes</Typography>
        <Stack>
          <Link href='./clientes?showDialog=true'>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Novo
            </Button>
          </Link>
        </Stack>
      </Stack>

      <ClientesTable clientList={clienteList} />
    </Stack>
  );
}
