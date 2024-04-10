import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from 'react';
import { ProdutoType, addProduto, getProdutos } from "@/models/produto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ClienteType, getClientes } from "@/models/cliente";
import ProdutosTable, { ProdutoTableData } from "@/components/tablesViews/produtosTable";
import { ClienteTableData } from "@/components/tablesViews/clientesTable";
import ProdutosVendaTable from "@/components/tablesViews/produtosVendaTable";
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import AddVendasForm from "./addVendasForm";
import { addVendaForm } from "./actions";
import { getVendas } from "@/models/vendas";



export default async function NovaVenda() {

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

  return (
    <AddVendasForm addVendaForm = {addVendaForm} produtosTableList={produtosTableList} clientesData={clientesTableList}/>
  )

}