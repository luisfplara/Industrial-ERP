'use client'
import { Box, Card, CardActionArea, CardContent,  Checkbox, Grid, Typography } from "@mui/material"


import React, { useState } from "react"
import Link from "next/link"
import { EstoqueType } from "@/data/estoque"

export default function EstoqueGrid(props: { estoqueList: ({ id: string, selected: boolean } & EstoqueType) [] }): React.JSX.Element {
//setSelectedCards(selectedCards?.set(data.id,true))
    const [selectedCards, setSelectedCards] = useState<string[]>([])
    console.log(selectedCards)

    let  rowSelectionModelParams:string = '';
    
    console.log(selectedCards)
    
    selectedCards.forEach((id)=>{
      rowSelectionModelParams+='&id='+id
    })
    
    return (
        <div>
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