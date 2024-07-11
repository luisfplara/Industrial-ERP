import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Grid } from '@mui/material';
import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ProdutosTable, { ProdutoTableData } from '@/components/tablesViews/produtosTable';
import {  getProdutos } from '@/models/produto';
import AddProdutosDialog from '@/components/dialogs/AddProdutosDialog';
import { addProdutoForm, deleteProdutoForm } from './actions';
import Link from 'next/link';
import DataManupulationHeader from '@/components/DataManupulationHeader';
import DeleteDOCDialog from '@/components/dialogs/DeleteProdutoEstoqueDialog';
import { getVendas } from '@/models/vendas';

export default async function Produtos() {


  const produtosData = await getProdutos()

  const produtosList: Array<ProdutoTableData> = []

  produtosData.forEach((data) => {
    produtosList.push({ id: data.id, ...data.data() })

  })

  return (
    <Container >

      <AddProdutosDialog submitAction={addProdutoForm} />
      <DeleteDOCDialog deleteAction={deleteProdutoForm}/>
      <Grid>
        <ProdutosTable produtoList={produtosList}/>
      </Grid>
   
    </Container >
  );
}
