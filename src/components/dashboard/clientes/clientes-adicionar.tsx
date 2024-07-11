'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";

export default function AdicionarClienteDialog(props: { submitAction: (event: FormData) => {} }) {

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

  const submitForm = async (formData: FormData) => {
    props.submitAction(formData);
    handleClose()
  }

  const handleClose = () => {
    router.back()
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        action: submitForm,

      }}
    >
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          required
          margin="dense"
          id="nome"
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
          id="telefone"
          name="telefone"
          label="Telefone"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus

          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus

          required
          margin="dense"
          id="endereco"
          name="endereco"
          label="Endereco"
          type="text"
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