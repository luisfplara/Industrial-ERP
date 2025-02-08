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
import { Pencil as EditIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getClientes } from '@/data/cliente';


//  <DataManupulationHeader addDialogLink={'./clientes?addDialog=true'} deleteDialogLink={'./clientes?deleteDialog=true'+rowSelectionModelParams} />

export default function ClientesTable(props: { clienteCount: number }): React.JSX.Element {
  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  console.log("clienteCount --> ", props.clienteCount);
  const [clientes, setClientes] = React.useState<Cliente[]>([])
  const [loadingClientes, setLoadingClientes] = React.useState<boolean>(false)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'displayName', headerName: 'Nome', flex: 1 },
    { field: 'telefone', headerName: 'telefone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'endereco', headerName: 'Endereco', flex: 1 },
    {
      field: 'actions', type: 'actions',
      getActions: (params: GridRowParams) => {
        return [
          <Link href={'./clientes/' + params.id} >
            <GridActionsCellItem
              icon={<ViewIcon size={20} />}
              label="View"
              onClick={() => {
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

  React.useEffect(() => {
    setLoadingClientes(true);
    console.log("paginationModel --> ", paginationModel)
    getClientes(paginationModel.pageSize, paginationModel.page).then((data) => {
      const clienteList: Cliente[] = []
      console.log("paginationModel:=> ", paginationModel);
      data.docs.forEach((data) => {
        clienteList.push({ id: data.id, ...data.data() })
      })
      console.log("clienteList:=> ", clienteList);
      setClientes(clienteList);
      setLoadingClientes(false);
    })
  }, [paginationModel]);

  return (
    <Box sx={{ width: '100%' }} >
      <DataGrid
        autoHeight
        loading={loadingClientes}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        apiRef={apiRef}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={clientes}
        rowCount={props.clienteCount}
        columns={columns}
        disableColumnFilter
        
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            
            showQuickFilter: true,
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              id: false,
            },
          },
        }
      } pageSizeOptions={[5, 10, 25, 50, { value: -1, label: 'Todos' }]}
      />
    </Box>
  );
}
