
'use client'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Checkbox, Typography } from "@mui/material"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"

import { EstoqueType } from "@/models/estoque"
import Link from "next/link"


export const EstoqueCard = (props: { estoque: { id: string, selected: boolean } & EstoqueType }) => {
  return (
<div>

</div>
  )
}

/*    <Card variant="outlined" sx={{backgroundColor: props.estoque.selected?'#a9b591':''}}>
      <CardHeader
      sx={{margin:0}}
    
        action={
          <Checkbox value={props.estoque.selected} />
        }
      />
      <CardActionArea LinkComponent={Link} href={"./estoque/" + props.estoque.id}>
        <CardContent>
          
          <Typography variant="h4" component="div">
            {props.estoque.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
            Localização: {props.estoque.localizacao}
          </Typography>
        </CardContent>

      </CardActionArea>
    </Card>*/