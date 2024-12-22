'use client'
import CardItem from "../dashbaord-carditem";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export function CapacidadeEstoqueChart(props: { pData: number[], xLabels: string []}) {
    return (
        <CardItem>
            <Typography variant="h6" gutterBottom align='left'>
                Capacidade
            </Typography>
            <Box sx={{ width: '100%' }} color='green'>
                <LineChart
                    width={500}
                    height={300}
                    series={[
                        { data: props.pData },

                    ]}
                    xAxis={[{ scaleType: 'point', data: props.xLabels }]}
                />
            </Box>
        </CardItem>
    )
}
export function EstradaESaidaEstoqueChart(props: { pData: any, uData: any, xLabels: any }) {
    return (
        <CardItem>
            <Typography variant="h6" gutterBottom align='left'>
                Entra e Saída
            </Typography>
            <Box sx={{ width: '100%' }} color='green'>
                <LineChart
                    width={500}
                    height={300}
                    series={[
                        { data: props.pData, label: 'Entrada' },
                        { data: props.uData, label: 'Saida' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: props.xLabels }]}
                />
            </Box>
        </CardItem>
    )


}