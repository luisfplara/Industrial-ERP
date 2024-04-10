'use client'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import * as React from 'react';
import { ProdutoType, addProduto, getProdutos } from "@/models/produto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ClienteType, getClientes } from "@/models/cliente";
import ProdutosTable, { ProdutoTableData } from "@/components/tablesViews/produtosTable";
import { ClienteTableData } from "@/components/tablesViews/clientesTable";
import ProdutosVendaTable from "@/components/tablesViews/produtosVendaTable";
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel, GridSlotsComponentsProps, useGridApiRef } from "@mui/x-data-grid";
import { DocumentData, DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import CardItem from "@/components/CardItem";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { VendaType } from "@/models/vendas";


const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});


export interface ProdutoVendaTableData extends ProdutoTableData {
    quantidade?: number,
    valorTotal?: number,
}




export default function VendaView(params: { venda:VendaType|undefined, cliente:ClienteType|undefined}) {

    const apiRef = useGridApiRef();

    const [produtosParaVender, setProdutosParaVender] = React.useState<Map<string, ProdutoVendaTableData>>(new Map())

    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, },
        { field: 'nome', headerName: 'Nome', flex: 1, },
        { field: 'unidade', headerName: 'Unidade', flex: 1 },
        { field: 'volume', headerName: 'Volume', flex: 1, type: 'number' },
        {
            field: 'valor',
            headerName: 'Valor',
            type: "number",
            valueGetter: (value) => formatter.format(value),
            flex: 1,
        },
        {
            field: 'quantidade',
            headerName: 'Quantidade',
            type: 'number',
            renderCell: (params: GridCellParams) => (

                <TextField
                    autoFocus
                    margin="dense"
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    fullWidth
                    value={params.row.quantidade}
                    disabled
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        console.log('event.target.value', event.target.value)
                        if (!isNaN(+event.target.value)) {
                            if (event.target.valueAsNumber >= 0) {
                                params.row.quantidade = +event.target.value
                                params.row.valorTotal = params.row.quantidade * params.row.valor
                                console.log(params.row)
                                if (params.row.quantidade > 0) {
                                    setProdutosParaVender(new Map(produtosParaVender.set(params.row.id, params.row)))
                                } else {
                                    const aux = produtosParaVender
                                    aux.delete(params.row.id)
                                    setProdutosParaVender(new Map(aux))
                                }
                            } else {
                                event.target.valueAsNumber = 0;
                            }
                        }

                    }}
                />

            ),
        },
        {
            field: 'valorTotal',
            headerName: 'Valor total',
            type: 'number',
            valueGetter: (value) => formatter.format(value),
        }

    ];


    const qtdProdutosTotal = params.venda?.produtos.length ;
    var valorTotalProdutos = 0;

    params.venda?.produtos.forEach((value) => {
        console.log(produtosParaVender)
       // qtdProdutosTotal += +(value.quantidade || 0);

        valorTotalProdutos = valorTotalProdutos + (value.valorTotal || 0);
        console.log('valorTotalProdutos', value.valorTotal)
    })


    const [cliente, setCliente] = React.useState(params.cliente);

    function sendData() {
        const productsListAux:Array<ProdutoVendaTableData>= []

        produtosParaVender.forEach((value, key)=>{
            productsListAux.push(value)
        })

        const venda: VendaType = {
            cliente: cliente?.nome||'',
            produtos: productsListAux,
            qtdTotalProdutos: qtdProdutosTotal||0,
            valorTotalVenda: valorTotalProdutos
        }
        //params.addVendaForm(venda)
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <FormControl sx={{ width: '100%' }} >
                <Stack spacing={3} direction="column" alignItems="stretch" justifyContent="space-between">
                    <Paper sx={{ backgroundColor: '#fff' }}>
                        <Stack >
                            <InputLabel id="unidade-select-label">Clientes</InputLabel>

                            <Select
                                required
                                labelId="unidade-select-label"
                                id="unidade-select"
                                name="clientes"
                                label="Clientes"
                                onChange={(selected)=>{}}
                                defaultValue={params.cliente?.nome || 'Sem clientes'}>
                               <MenuItem key={1} value={params.cliente?.nome}>{params.cliente?.nome}</MenuItem>
                            </Select>
                        </Stack>
                    </Paper>
                    <Stack  >
                        <CardItem>
                            <DataGrid

                                apiRef={apiRef}
                                rows={params.venda?.produtos}
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

                            />

                            <Stack direction="row" my={3} alignItems="center" justifyContent="flex-end" spacing={2}>

                                <Paper sx={{ backgroundColor: '#e8e8e8' }}>
                                    <Stack m={1}>


                                        Quantidade de produtos
                                        <Box sx={{ width: '100%' }} color='green'>
                                            {
                                                qtdProdutosTotal
                                            }
                                        </Box>


                                    </Stack>
                                </Paper>

                                <Paper sx={{ backgroundColor: '#e8e8e8' }}>
                                    <Stack m={1}>


                                        Valor total da venda
                                        <Box sx={{ width: '100%' }} color='green'>
                                            {formatter.format(valorTotalProdutos)}
                                        </Box>


                                    </Stack>
                                </Paper>

                            </Stack>
                        </CardItem>
                    </Stack>


                </Stack>
            </FormControl>
        </Box >

    )

}