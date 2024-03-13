'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import {getDocs, collection,getDoc, DocumentData, QuerySnapshot} from 'firebase/firestore'
import { db } from 'lib/firebase-config';
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import * as React from 'react';
export default function AddClienteDialog(){
    const [open, setOpen] = React.useState(false);  
    const [clientes, setClientes] = React.useState<QuerySnapshot>();
    var selectedClienteId;
    const searchParams = useSearchParams();
    const showAddClienteDialog = searchParams.get('showAddClienteDialog')
    // const addClienteDialogRef = React.useRef<null | HTMLDialogElement>(null)
    
    React.useEffect(() => {
        if(showAddClienteDialog=='true'){
          setOpen(true);
        }else{

          setOpen(false);
        }
        const collectionRef = collection(db,'cliente')
        getDocs(collectionRef).then((docs)=>{
          setClientes(docs);
        docs.docs.forEach((e)=>{
        
          console.log(e.data())
       
          });
    
      });
    
      },[searchParams]);
      const handleClose = () => {
        setOpen(false);
      };
      const handleChange = (event: SelectChangeEvent) => {
        selectedClienteId = event.target.value as string

      };
    return( <Dialog
    open={open}
    onClose={handleClose}

    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
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
        id="name"
        name="email"
        label="Nome"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="email"
        label="Descrição"
        type="text"
        fullWidth
        variant="standard"
      />
      <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedClienteId}
          label="Cliente"
          onChange={handleChange}
        >
          {clientes?.docs.map((e)=>{
            return <MenuItem value={e.id}>{e.data()?.nome}</MenuItem>
          })}

        </Select>
      </FormControl>
      </Box>



    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Adicionar</Button>
    </DialogActions>
  </Dialog>
    )

}