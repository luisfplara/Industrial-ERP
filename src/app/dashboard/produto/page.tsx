import * as React from 'react';

import {Container, Grid, Typography } from '@mui/material';

import ProdutosTable, { type ProdutoTableData } from '@/components/dashboard/produto/produto-table';
import { getProdutos } from '@/data/produto';
import AddProdutosDialog from '@/components/dashboard/produto/produto-adicionar';
import { addProdutoForm, deleteProdutoForm } from './actions';
import Link from 'next/link';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

export default async function Produtos() {


  const produtosData = await getProdutos()

  const produtosList: ProdutoTableData[] = []

  produtosData.forEach((data) => {
    produtosList.push({ id: data.id, ...data.data() })

  })

  return (
    <Stack spacing={3}>
    <AddProdutosDialog submitAction={addProdutoForm} />
    <Stack direction="row" spacing={3}>
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Produto</Typography>
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
        <Link href='./produto?addDialog=true'>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </Link>
      </div>
    </Stack>
    <ProdutosTable produtoList={produtosList}/>
  </Stack>
  );
}
