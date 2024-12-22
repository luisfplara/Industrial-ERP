'use client'

import * as React from 'react';

import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid';
import CardItem from '../dashbaord-carditem';
import { Grid } from '@mui/material';

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, },
  { field: 'nome', headerName: 'Nome', flex: 1, },
  { field: 'unidade', headerName: 'Unidade', flex: 1, },
  { field: 'volume', headerName: 'Volume', flex: 1, type: 'number' },
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



export default function ProdutosTable(props: { produtoList: ProdutoTableData[] }) {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  let rowSelectionModelParams = '';
  console.log(rowSelectionModel)

  rowSelectionModel.forEach((id) => {
    rowSelectionModelParams += `&id=${  id}`
  })




  return (
    <CardItem>

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