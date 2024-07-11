import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LinearProgress, LinearProgressProps, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import ProdutosTable from '@/components/tablesViews/produtosTable';
import { ProdutoType, getOneProduto, getProdutos } from '@/data/produto';
import CardItem from '@/components/dashboard/dashbaord-carditem';
import { CapacidadeEstoqueChart, EstradaESaidaEstoqueChart } from '@/components/dashboard/estoque/estoque-charts';
import { deleteProdutoEstoque, getEstoques, getOneEstoqueWithId, getProdutosEstoque, getProdutosFromEstoque } from '@/data/estoque';
import DataManupulationHeader from '@/components/DataManupulationHeader';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ProdutosEstoqueTable, { ProdutoEstoqueData } from '@/components/dashboard/estoque/estoque-tabela-produto';
import AddEstoqueDialog from '@/components/dialogs/AddEstoqueDialog';
import { addProdutoEstoqueForm, deleteProdutoEstoqueForm } from './actions';
import AddProdutoEstoqueDialog from '@/components/dashboard/estoque/estoque-produto-adicionar';

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default async function BasicGrid({ params }: { params: { id: string } }) {

    const estoqueData = await getOneEstoqueWithId(params.id);
    const produtosEstoque = await getProdutosFromEstoque(params.id)
    const produtosData = await getProdutos();

    const produtosList: Array<{ docId: string } & ProdutoType> = []
    const produtosEstoqueList: Array<ProdutoEstoqueData> = []

    var quantidadeDeProdutos: number = 0;
    var volumeDeProdutos: number = 0;
    var valorTotalProdutos: number = 0
    produtosData.docs.forEach((data) => {
        produtosList.push({ docId: data.id, ...data.data() });
    })


    for (const produtoEstoque of produtosEstoque.docs) {

        const produto = await getOneProduto(produtoEstoque.data().produtoId)
        const tabledata: ProdutoEstoqueData = {
            id: produtoEstoque.id,
            name: produto.data()?.nome || 'not found',
            unidade: produto.data()?.unidade || 'not found',
            valorUn: produto.data()?.valor || 0,
            quantidade: produtoEstoque.data().quantidade,
            valorTotal: produtoEstoque.data().quantidade * (produto.data()?.valor || 0),
            volumeUn: produto.data()?.volume || 0,
            volumeOcupado: produtoEstoque.data().quantidade * (produto.data()?.volume || 0)
        }
        valorTotalProdutos += +produtoEstoque.data().quantidade * (produto.data()?.valor || 0)
        quantidadeDeProdutos += +produtoEstoque.data().quantidade
        volumeDeProdutos += +produtoEstoque.data().quantidade * (produto.data()?.volume || 0)

        produtosEstoqueList.push(tabledata)
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AddProdutoEstoqueDialog submitAction={addProdutoEstoqueForm} produtosList={produtosList} estoqueId={params.id} />
           
            <Typography variant="h5" gutterBottom>
                Estoque {estoqueData.data()?.name}
            </Typography>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center">
                <Grid item xs={4} >
                    <CardItem>
                        <Stack direction="row" alignItems="center">
                            <Typography variant="subtitle1" gutterBottom>
                                Capacidade:
                            </Typography>
                            <Typography variant="body1" gutterBottom mx={1} color="green">
                                {estoqueData.data()?.capacidade} m³
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Typography variant="subtitle1" gutterBottom>
                                Utilizado:
                            </Typography>
                            <Typography variant="body1" gutterBottom mx={1} color="green">
                                {volumeDeProdutos} m³
                            </Typography>
                        </Stack >
                        <Stack direction="column" alignItems="center" >
                            <Box sx={{ width: '100%' }} mx={0.5}>
                                <LinearProgressWithLabel value={(volumeDeProdutos / (estoqueData.data()?.capacidade || 1)) * 100 || 0} />
                            </Box>
                        </Stack>
                    </CardItem>
                </Grid>
                <Grid item xs={4}>
                    <CardItem>

                        Quantidade de produtos
                        <Box sx={{ width: '100%' }} color='green'>
                            {quantidadeDeProdutos}
                        </Box>

                    </CardItem>
                </Grid>
                <Grid item xs={4}>
                    <CardItem>
                        Valor total em produtos
                        <Box sx={{ width: '100%' }} color='green'>
                            {formatter.format(valorTotalProdutos)}
                        </Box>
                    </CardItem>
                </Grid>
                <Grid item >
                    <CapacidadeEstoqueChart pData={pData} xLabels={xLabels} />
                </Grid>
                <Grid item >
                    <EstradaESaidaEstoqueChart pData={pData} uData={uData} xLabels={xLabels} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    alignItems="left"
                    justifyContent="left"
                >

                    
                    <ProdutosEstoqueTable produtoEstoqueList={produtosEstoqueList} estoqueId={params.id} />
                </Grid>


            </Grid>
        </Box>
    );
}
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];