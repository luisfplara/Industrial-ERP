import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from 'react';
import { ProdutoType, addProduto, getProdutos } from "@/models/produto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ClienteType, getClientes, getOneCliente } from "@/models/cliente";
import ProdutosTable, { ProdutoTableData } from "@/components/tablesViews/produtosTable";
import { ClienteTableData } from "@/components/tablesViews/clientesTable";
import ProdutosVendaTable from "@/components/tablesViews/produtosVendaTable";
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import AddVendasForm from "./addVendasForm";
import { addVendaForm } from "./actions";
import { getOneVenda, getVendas } from "@/models/vendas";
import { VendaTableData } from "@/components/tablesViews/vendasTable";
import VendaView from "./addVendasForm";



export default async function NovaVenda({ params }: { params: { id: string } }) {

    const clientesData = await getClientes()

    const produtosData = await getProdutos();




    const produtosTableList: Array<ProdutoTableData> = []

    const clientesTableList: Array<ClienteTableData> = []

    produtosData.forEach((data) => {
        produtosTableList.push({ id: data.id, ...data.data() })

    })

    clientesData.forEach((data) => {
        clientesTableList.push({ id: data.id, ...data.data() })
    })


    const vendaData = await getOneVenda(params.id)
    const clienteData = await getOneCliente(vendaData.data()?.cliente || '');

        return (
            <VendaView venda={vendaData.data()} cliente={clienteData.data()} />
        )
 
  
}

