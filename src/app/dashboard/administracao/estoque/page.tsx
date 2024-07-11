
import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


import { Button, Card, Grid, } from '@mui/material';

import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { EstoqueCard } from '@/components/cards/estoqueCard';

import AddEstoqueDialog from '@/components/dialogs/AddEstoqueDialog';
import { addEstoqueForm, deleteEstoqueForm } from './actions';
import { EstoqueType, getEstoques } from '@/models/estoque';
import DataManupulationHeader from '@/components/DataManupulationHeader';
import DeleteDOCDialog from '@/components/dialogs/DeleteProdutoEstoqueDialog';
import EstoqueGrid from '@/components/gridViews/estoqueGrid';


export default async function Clientes() {

  const estoqueData = await getEstoques()

  const estoqueList: Array<{ id: string, selected:boolean } & EstoqueType> = []

  estoqueData.forEach((data) => {
    estoqueList.push({ id: data.id, selected:false , ...data.data() })

  })
  

  return (
    <Box >
    
      <AddEstoqueDialog submitAction={addEstoqueForm} />
      <DeleteDOCDialog deleteAction={deleteEstoqueForm} />
      <Grid>
        <EstoqueGrid estoqueList={estoqueList}/>
      </Grid>
     
    </Box >
  );
}
