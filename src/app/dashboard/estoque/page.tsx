
import * as React from 'react';
import { Button, Stack, Typography, } from '@mui/material';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import Link from 'next/link';
import AdicionarEstoqueDialog from '@/components/dashboard/estoque/estoque-adicionar';
import { addEstoqueForm, deleteEstoqueForm } from './actions';
import { type EstoqueType, getEstoques } from '@/data/estoque';

import EstoqueGrid from '@/components/dashboard/estoque/estoque-grid';



export default async function Clientes() {

  const estoqueData = await getEstoques()

  const estoqueList: ({ id: string, selected:boolean } & EstoqueType)[] = []

  estoqueData.forEach((data) => {
    estoqueList.push({ id: data.id, selected:false , ...data.data() })

  })
  

  return (

    <Stack spacing={3}>
    <AdicionarEstoqueDialog submitAction={addEstoqueForm} />
    <Stack direction="row" spacing={3}>
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Estoque</Typography>
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
        <Link href='./estoque?addDialog=true'>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </Link>
      </div>
    </Stack>
    
    <EstoqueGrid estoqueList={estoqueList}/>
  </Stack>
  );
}
