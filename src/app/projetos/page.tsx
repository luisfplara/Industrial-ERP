import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Button, Card, CardActions, CardContent, DialogActions, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getDocs, collection, getDoc, DocumentData, QuerySnapshot } from 'firebase/firestore'
import { db } from 'lib/firebase-config';
import AddClienteDialog from '@/components/dialogs/AddClienteDialogs';
import Link from 'next/link';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);


export default function Projetos() {




  return (

    <Box sx={{}}>
      <Box sx={{ display: 'flex' }} mt={2} justifyContent="right">
        <Link href="/projetos?showAddClienteDialog=true">
          <Button variant="outlined"  >
            Adicionar Projeto
          </Button>
        </Link>
        <AddClienteDialog/>
      </Box>
      <Grid container
        mt={2}
        gap={2}
        alignItems="center"
        justifyContent="center"
      >


        <Grid >
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
        <Grid >
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
        <Grid >
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
        <Grid >
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
      </Grid>
    </Box >
  );
}
