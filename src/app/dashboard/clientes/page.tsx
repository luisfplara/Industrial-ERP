import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
//import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
// import { CustomersTable } from '@/components/dashboard/customer/customers-table';
//import type { Customer } from '@/components/dashboard/customer/customers-table';
import ClientesTable, { type ClienteTableData } from '@/components/dashboard/clientes/clientes-table';
import { getClientes } from '@/data/cliente';
import AdicionarClienteDialog from '@/components/dashboard/clientes/clientes-adicionar';
import { addClientForm } from './actions';
import Link from 'next/link';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;


export default async function Page(): Promise<React.JSX.Element> {
  //const page = 0;
  //const rowsPerPage = 5;

  //const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const clienteData = await getClientes()

  const clienteList: ClienteTableData[] = []

  clienteData.forEach((data) => {
    clienteList.push({ id: data.id, ...data.data() })

  })
  return (
    <Stack spacing={3}>
      <AdicionarClienteDialog submitAction={addClientForm} />
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Clientes</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Link href='./clientes?addDialog=true'>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Add
            </Button>
          </Link>
        </div>
      </Stack>
      
      <ClientesTable clientList={clienteList} />
    </Stack>
  );
}
