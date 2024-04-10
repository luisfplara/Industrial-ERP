import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ClienteType, getClientes, listenerClientes } from '@/models/cliente';
import AddClientesDialog from '@/components/dialogs/AddClientesDialog';
import ClientesTable, { ClienteTableData } from '@/components/tablesViews/clientesTable';
import Link from 'next/link';
import { addClientForm, deleteClienteForm} from './actions';
import DataManupulationHeader from '@/components/DataManupulationHeader';
import DeleteDOCDialog from '@/components/dialogs/DeleteProdutoEstoqueDialog';


export default async function Clientes() {



  var clienteData = await getClientes()

  const clienteList: Array<ClienteTableData> = []

  clienteData.forEach((data) => {
    clienteList.push({ id: data.id, ...data.data() })

  })

  return (
    <Box >
      <React.Suspense>
      <AddClientesDialog submitAction={addClientForm} />
      <DeleteDOCDialog deleteAction={deleteClienteForm}/>
      <Grid>

      <ClientesTable clientList={clienteList} />

      </Grid>
      </React.Suspense>
    </Box >
  );
}
