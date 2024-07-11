'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from 'react';
import { ProdutoType } from "@/data/produto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";




export default function AddProdutoEstoqueDialog(props: { 
  submitAction: (id:string, event: FormData) => {} ,  
  produtosList: Array<{ docId: string } & ProdutoType>,
  estoqueId:string
}) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState<boolean>(false)
  const search = searchParams.get('addDialog')
  const [selectedClienteId, setSelectedClienteId] = React.useState<string>();
  
  React.useEffect(() => {
    if (search == 'true') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [search]);

  const handleClose = () => {
    router.back()
  };

  const submitForm = (formData: FormData) => {
    props.submitAction(props.estoqueId,formData)
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
        <Box mt={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="unidade-select-label">Produto</InputLabel>
            <Select
              required
              labelId="unidade-select-label"
              id="unidade-select"
              name="produto"
              label="Prodtuo"
              defaultValue={props.produtosList[0]?.docId||'Sem produtos'}
            >{props.produtosList.map(
              (data)=>{
                return <MenuItem key={1} value={data.docId}>{data.nome}</MenuItem>
              }
            )}

            </Select>
          </FormControl>
        </Box>
        <TextField
          autoFocus
          required
          margin="dense"
          name="quantidade"
          label="Quantidade"
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