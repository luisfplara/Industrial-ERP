'use client'
import * as React from 'react';

import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid';
import CardItem from '../dashbaord-carditem';
import { Box, Grid, Typography } from '@mui/material';

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'unidade', headerName: 'Unidade', flex: 1 },
  {
    field: 'quantidade',
    headerName: 'Quantidade',
    flex: 1
  },
  {
    field: 'valorUn',
    headerName: 'Valor Un',
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (value) => formatter.format(value),
    flex: 1
  },
  {
    field: 'valorTotal',
    headerName: 'Valor Total',
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (value) => formatter.format(value),
    flex: 1
  },
  {
    field: 'volumeUn',
    headerName: 'Volume Un m³',
    description: 'This column has a value getter and is not sortable.',
    type: 'number',
    flex: 1
  },
  {
    field: 'volumeOcupado',
    headerName: 'Volume Ocupado m³',
    description: 'This column has a value getter and is not sortable.',
    type: 'number',
    flex: 1
  },
];


export interface ProdutoEstoqueData {
  id: string,
  name: string,
  unidade: string,
  quantidade: number,
  valorUn: number,
  valorTotal: number,
  volumeUn: number,
  volumeOcupado: number
}


export default function ProdutosEstoqueTable(props: { produtoEstoqueList: ProdutoEstoqueData[], estoqueId: string }) {

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
    let rowSelectionModelParams = '';
  console.log(rowSelectionModel)

  rowSelectionModel.forEach((id)=>{
    rowSelectionModelParams+=`&id=${id}`
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
          justifyContent="left" />
        <Box sx={{ width: '100%' }} >
          <DataGrid
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            rows={props.produtoEstoqueList}
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