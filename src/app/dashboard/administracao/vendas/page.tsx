import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Grid } from '@mui/material';
import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ProdutosTable, { ProdutoTableData } from '@/components/tablesViews/produtosTable';
import { getProdutos } from '@/models/produto';
import AddProdutosDialog from '@/components/dialogs/AddProdutosDialog';
import {  deleteVendaForm } from './actions';
import Link from 'next/link';
import DataManupulationHeader from '@/components/DataManupulationHeader';
import DeleteDOCDialog from '@/components/dialogs/DeleteProdutoEstoqueDialog';
import AddProdutoEstoqueDialog from '@/components/dialogs/AddProdutoEstoqueDialog';
import AddVendasDialog from '@/components/dialogs/AddVendasDialog';
import { ClienteType, getClientes } from '@/models/cliente';
import { VendaType, getVendas } from '@/models/vendas';
import VendasTable, { VendaTableData } from '@/components/tablesViews/vendasTable';

export default async function Produtos() {

  const vendaData = await getVendas()
  const clientesData = await getClientes()


  const vendaList: Array<VendaTableData> = []

  vendaData.forEach((data) => {
    vendaList.push({ id: data.id, ...data.data() })
  });


  return (
    <Container >
        <React.Suspense>

        
      <DeleteDOCDialog deleteAction={deleteVendaForm} parentId='adas' />
      <Grid>
        <VendasTable vendaList={vendaList} />
      </Grid>
      </React.Suspense>
    </Container >
  );
}
