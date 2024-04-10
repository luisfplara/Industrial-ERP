'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from 'react';
import { ProdutoType, addProduto } from "@/models/produto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { GridRowSelectionModel } from "@mui/x-data-grid";




export default function DeleteDOCDialog(props: {
  deleteAction: (formData: FormData, parentId?:string) => void,
  parentId?: string 
}) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState<boolean>(false)
  const deleteDialog = searchParams.get('deleteDialog')
  const docsIds = searchParams.getAll('id')
  const [selectedClienteId, setSelectedClienteId] = React.useState<string>();

  React.useEffect(() => {
    if (deleteDialog == 'true') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [deleteDialog]);

  const handleClose = () => {
    router.back()
  };

  const submitForm = (formData: FormData) => {
    props.deleteAction(formData, props.parentId)
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <input hidden={true} name="docsIds" value={docsIds}/>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja remover {docsIds.length} registros?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Confirmar</Button>
        <Button onClick={handleClose} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )

}