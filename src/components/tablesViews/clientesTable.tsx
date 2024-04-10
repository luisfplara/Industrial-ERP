'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Grid, Typography } from '@mui/material';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ClienteType } from '@/models/cliente';
import CardItem from '../CardItem';
import DataManupulationHeader from '../DataManupulationHeader';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'nome', headerName: 'Nome', flex: 1 },
  { field: 'telefone', headerName: 'telefone', flex: 1 },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'endereco',
    headerName: 'Endereco',
    flex: 1
  },
];
export interface ClienteTableData {
  id: string,
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}


export default function ClientesTable(props: { clientList: Array<ClienteTableData>}) {
  const [rowSelectionModel, setRowSelectionModel] =
  React.useState<GridRowSelectionModel>([]);
  var rowSelectionModelParams:string = '';
console.log(rowSelectionModel)

rowSelectionModel.forEach((id)=>{
  rowSelectionModelParams+='&id='+id
})

  return (
    
    <div>
    <CardItem>
      <Typography
        variant="h6"
        gutterBottom
        align='left'
      >
        Produtos no estoque
      </Typography>

      <Grid item xs={12} alignItems="left"
        justifyContent="left">
        <DataManupulationHeader addDialogLink={'./clientes?addDialog=true'} deleteDialogLink={'./clientes?deleteDialog=true'+rowSelectionModelParams} />
      </Grid>
      <Box sx={{ width: '100%' }} >
        <DataGrid
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={props.clientList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              },
            },
          }}

          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </CardItem>
  </div>
  );
}