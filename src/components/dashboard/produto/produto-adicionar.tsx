'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from 'react';

import { useSearchParams , useRouter } from "next/navigation";





export default function AddProdutosDialog(props: { submitAction: (event: FormData) => {} }) {

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
          id="nome"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
        />

        <Box mt={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="unidade-select-label">Unidade</InputLabel>
            <Select
              required
              labelId="unidade-select-label"
              id="unidade-select"
              name="unidade"
              label="Unidade"
              defaultValue="kg"
            >
              <MenuItem key={1} value='kg'>Kg</MenuItem>
              <MenuItem key={2} value='un'>Un</MenuItem>
              <MenuItem key={3} value='saca'>Saca</MenuItem>

            </Select>
          </FormControl>
        </Box>
        <TextField
          autoFocus
          required
          margin="dense"
          name="volume"
          label="Volume m³"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus

          required
          margin="dense"
          id="valor"
          name="valor"
          label="Valor"
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