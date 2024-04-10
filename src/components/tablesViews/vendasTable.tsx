

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
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import CardItem from '../CardItem';
import { Box, Grid, List, Stack, Typography } from '@mui/material';
import DataManupulationHeader from '../DataManupulationHeader';
import { ProdutoVendaTableData } from '@/app/dashboard/administracao/vendas/novaVenda/addVendasForm';
import Button from '@mui/material/Button';
import Link from 'next/link';

/*

valueGetter: (value: Array<ProdutoVendaTableData>) => {
      console.log('value ', value)
      let produtosListName = ''
      value.forEach((produtoVenda) => {
        produtosListName += produtoVenda.nome + " | "
      });
      return produtosListName
    }

*/

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, },
  { field: 'cliente', headerName: 'Cliente', flex: 1, },
  {
    field: 'produtos', headerName: 'Produtos', flex: 1,
    renderCell: (params: GridCellParams) => {
      const produtos: Array<ProdutoVendaTableData> = params.row.produtos;
      console.log('produtosprodutos', produtos)
      return (

        <Box style={{ height: '100%', overflow: 'auto', alignItems: 'flex-end', marginTop: 10, marginBottom: 100 }} >

          {produtos.map((produto) => {
            return (
              <Stack direction="row" justifyContent="space-around" >
                <Typography

                  gutterBottom
                  align='left'
                >
                  {produto.nome}
                </Typography>

                <Typography

                  gutterBottom
                  align='left'
                >
                  {"-> " + produto.quantidade + " " + produto.unidade}
                </Typography>
              </Stack>
            )
          }


          )}

        </Box >
      )

    },
  },
  {
    field: 'qtdTotalProdutos', headerName: 'Qtd Produtos', flex: 1,

  },
  {
    field: 'valorTotalVenda',
    headerName: 'Valor Total',
    valueGetter: (value) => formatter.format(value),
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params: GridCellParams) => {
      const onClick = (event: any) => {

      };
      
      return (
        <Link href={"./vendas/"+params.row.id }>
          <Button variant="contained" >Detalhes</Button>;
        </Link>
      )
    }
  },
];


export interface VendaTableData {
  id: string,
  cliente: string,
  produtos: Array<ProdutoVendaTableData>,
  qtdTotalProdutos: number,
  valorTotalVenda: number,
}



export default function VendasTable(props: { vendaList: Array<VendaTableData> }) {
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
        <DataManupulationHeader addDialogLink='./vendas/novaVenda' deleteDialogLink={'./vendas?deleteDialog=true' + rowSelectionModelParams} />
      </Grid>
      <Grid item xs={4} mt={2}>

        <DataGrid
          rowHeight={100}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={props.vendaList}
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