

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
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ProdutoType } from '@/models/produto';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import CardItem from '../CardItem';
import { Grid } from '@mui/material';
import DataManupulationHeader from '../DataManupulationHeader';


const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, },
  { field: 'nome', headerName: 'Nome', flex: 1, },
  { field: 'unidade', headerName: 'Unidade', flex: 1, },
  { field: 'volume', headerName: 'Volume', flex: 1, type:'number'},
  {
    field: 'valor',
    headerName: 'Valor',
    valueGetter: (value) => formatter.format(value),
    flex: 1,
  }
];


export interface ProdutoTableData {
  id: string,
  nome: string,
  unidade: string,
  volume: number,
  valor: number,
}



export default function ProdutosVendaTable(props: { produtoList: Array<ProdutoTableData>, showDataManipulator:boolean }) {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  var rowSelectionModelParams: string = '';
  console.log(rowSelectionModel)

  rowSelectionModel.forEach((id) => {
    rowSelectionModelParams += '&id=' + id
  })




  return (
    <CardItem>
      <Grid item xs={4} >
      {props.showDataManipulator??<DataManupulationHeader addDialogLink='./produtos?addDialog=true' deleteDialogLink={'./produtos?deleteDialog=true' + rowSelectionModelParams} />}
      </Grid>
      <Grid item xs={4} mt={2}>

        <DataGrid
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={props.produtoList}
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
      </Grid>

    </CardItem>
  );
}