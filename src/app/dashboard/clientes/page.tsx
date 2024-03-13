"use client"
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import { Button, Card, CardActions, CardContent, DialogActions, Grid, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { db } from 'lib/firebase-config';
import {addDoc, collection} from 'firebase/firestore'


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

export default function Clientes() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{}}>
      <Box sx={{ display: 'flex' }} mt={2} justifyContent="right">
        <Button variant="outlined" onClick={handleClickOpen} >
          Adicionar Cliente
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              console.log("formsubmitted");
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const nomeCliente = formJson.nomeCliente;
              console.log(nomeCliente);
              
              const client = collection(db, 'cliente');
              addDoc(client,{
                nome: nomeCliente,
                last: 'Lovelace',
                born: 1815
              });

              handleClose();
            },
          }}
        >
          <DialogTitle>Adicionar Projeto</DialogTitle>
          <DialogContent>


            <TextField
              autoFocus
              required
              margin="dense"
              id="nomeCliente"
              name="nomeCliente"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
            />




          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>

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
