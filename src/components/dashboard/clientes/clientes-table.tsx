'use client'

import * as React from 'react';
import { Box, Button, Grid, Typography, createTheme } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import type { } from "@mui/x-data-grid/themeAugmentation";
// import CardItem from '../CardItem';
//import DataManupulationHeader from '../DataManupulationHeader';
import { DataGrid, GridActionsCellItem, GridApi, type GridColDef, GridEditCellValueParams, GridRenderCellParams, GridRowParams, type GridRowSelectionModel, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, useGridApiRef } from '@mui/x-data-grid';
import CustomToolbar from './clientes-toolbar';
import { Cliente } from '@/types/cliente';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Eye as ViewIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useRouter } from 'next/router';
import Link from 'next/link';


//  <DataManupulationHeader addDialogLink={'./clientes?addDialog=true'} deleteDialogLink={'./clientes?deleteDialog=true'+rowSelectionModelParams} />

export default function ClientesTable(props: { clientList: Cliente[]}): React.JSX.Element {
  const apiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'telefone', headerName: 'telefone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'endereco', headerName: 'Endereco', flex: 1},
    { field: 'actions', type: 'actions',
      getActions: (params: GridRowParams) => {
        return [
          <Link href={'./clientes?showDialog=true&id=' + params.id} >
            <GridActionsCellItem
              icon={<ViewIcon size={20} />}
              label="View"
              onClick={() => {
                console.log('ididididi:--->', params.row)
                apiRef.current.selectRow(params.id, true, true);
                apiRef.current.updateRows([params.row]);
              }}
            />
          </Link>,
          <GridActionsCellItem
            icon={<DeleteIcon size={20} />}
            label="Delete"
            onClick={() => {
              console.log('ididididi:--->', params.id)
              apiRef.current.selectRow(params.id, true, true);
              apiRef.current.updateRows([params.row]);
            }}
          />
        ];
      },
    },
  ];


  return (
    <div>
      <Grid item xs={12} alignItems="left"
        justifyContent="left" />
      <Box sx={{ width: '100%' }} >
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          apiRef={apiRef}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
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