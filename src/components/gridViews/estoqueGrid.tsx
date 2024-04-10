'use client'
import { Box, Card, CardActionArea, CardContent, CardHeader, Checkbox, Grid, Typography } from "@mui/material"
import DataManupulationHeader from "../DataManupulationHeader"
import { EstoqueCard } from "../cards/estoqueCard"
import { EstoqueType } from "@/models/estoque"
import { useState } from "react"
import Link from "next/link"
export default function EstoqueGrid(props: { estoqueList: Array<{ id: string, selected: boolean } & EstoqueType> }) {
//setSelectedCards(selectedCards?.set(data.id,true))
    const [selectedCards, setSelectedCards] = useState<Array<string>>([])
    console.log(selectedCards)

    var rowSelectionModelParams:string = '';
    console.log(selectedCards)
    
    selectedCards.forEach((id)=>{
      rowSelectionModelParams+='&id='+id
    })
    
    return (
        <div>
            <Grid item xs={4}>
                <DataManupulationHeader addDialogLink='./estoque?addDialog=true' deleteDialogLink={'./estoque?deleteDialog=true' + rowSelectionModelParams} />
            </Grid>
            <Grid
                container
                mt={2}
                gap={1}
                alignItems="center"
                justifyContent="center"
            >
                {
                    props.estoqueList.map((data) => {
                        return (
                            <Box sx={{ minWidth: 275 }} key={data.id}>
                                <Card variant="outlined" sx={{ backgroundColor: data.selected ? '#a9b591' : '' }}>
                                    <Checkbox onChange= {(event, checked)=>{
                                        if(checked){
                                            setSelectedCards([data.id].concat(selectedCards) )
                                        }else{
                                            setSelectedCards(selectedCards.filter((v) => v!=data.id) )
                                        }
                                        }} />

                                    <CardActionArea LinkComponent={Link} href={"./estoque/" + data.id}>
                                        <CardContent>

                                            <Typography variant="h4" component="div">
                                                {data.name}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
                                                Localização: {data.localizacao}
                                            </Typography>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>

                            </Box>

                        )
                    })
                }
            </Grid>
        </div>)
}