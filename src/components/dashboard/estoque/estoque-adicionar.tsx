'use client'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import * as React from 'react';

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";




export default function AdicionarEstoqueDialog(props: { submitAction: (event: FormData) => {} }) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState<boolean>(false)
  const search = searchParams.get('addDialog')

  React.useEffect(() => {
    if (search === 'true') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [search]);

  const handleClose = () => {
    router.back()
  };

  const submitForm = (formData:FormData) => {
    props.submitAction(formData)
    handleClose();
  }

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        action: submitForm,
      }}
    >
      <DialogTitle>Adicionar Produto</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          required
          margin="dense"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="localizacao"
          label="Localização"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="capacidade"
          label="Capacidade"
          type="number"
          fullWidth
          variant="standard"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Adicionar</Button>
      </DialogActions>
    </Dialog>
  )

}