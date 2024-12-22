'use client'
import * as React from 'react';
import { Box, Grid, Typography, createTheme } from '@mui/material';
import { 	ptBR } from '@mui/x-data-grid/locales';
import type {} from "@mui/x-data-grid/themeAugmentation";
// import CardItem from '../CardItem';
//import DataManupulationHeader from '../DataManupulationHeader';
import { DataGrid, type GridColDef, type GridRowSelectionModel, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import CustomToolbar from './clientes-toolbar';


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
//  <DataManupulationHeader addDialogLink={'./clientes?addDialog=true'} deleteDialogLink={'./clientes?deleteDialog=true'+rowSelectionModelParams} />

export default function ClientesTable(props: { clientList: ClienteTableData[]}): React.JSX.Element {
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  let rowSelectionModelParams = '';

  console.log(rowSelectionModel)

  rowSelectionModel.forEach((id)=>{
    
    rowSelectionModelParams+=`&id=${id || ''}`
  })

  return (
    
    <div>
      <Grid item xs={12} alignItems="left"
        justifyContent="left" />
      <Box sx={{ width: '100%' }} >
        <DataGrid
         localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={props.clientList}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
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
  </div>
  );
}

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        slots: {
          toolbar: GridToolbar
        },
        slotProps: {
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              variant: "outlined",
              size: "small"
            }
          }
        }
      }
    }
  }
});