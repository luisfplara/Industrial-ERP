'use client'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Control, Controller, FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/system";
import FormTextField from "../formFields";
import { Cliente, clienteSchema, } from "@/types/cliente";
import { getOneCliente } from "@/data/cliente";
import { DocumentSnapshot } from "firebase/firestore";

enum MODO {
  View,
  New,
  Edit
}

export default function AdicionarClienteDialog(props: { submitAction: (cliente: Cliente) => {}, editAction: (oldCliente: Cliente, newCliente: Cliente) => {} }) {

  const [open, setOpen] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter();
  const [isLoadingCliente, setIsLoadingCliente] = React.useState<boolean>(false);

  const showDialog = searchParams.get('showDialog')
  const id = searchParams.get('id')
  const [readOnly, setReadOnly] = React.useState<boolean>(id != null);
  let modo: MODO;

  if (id && !readOnly) modo = MODO.Edit
  else if (id) modo = MODO.View
  else modo = MODO.New

  const [cliente, setCliente] = React.useState<Cliente>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    reset
  } = useForm<Cliente>({
    resolver: zodResolver(clienteSchema), defaultValues: {
      tipoPessoa: "fisica"
    }
  });

  let tipoPessoa = watch("tipoPessoa");

  React.useEffect(() => {
    if (showDialog === 'true') {
      setOpen(true)
    } else {
      setOpen(false)
    }

    if (id != null) {
      setIsLoadingCliente(true);
      setReadOnly(true);
      getOneCliente(id).then((clienteDoc: DocumentSnapshot<Cliente>) => {
        console.log('clienteDoc.data(): ', clienteDoc.data());
        reset(Object.assign({ id: clienteDoc.id }, clienteDoc.data()));
        setCliente(Object.assign({ id: clienteDoc.id }, clienteDoc.data()));
        setIsLoadingCliente(false);
      });
    } else {
      setReadOnly(false);
      reset({
        tipoPessoa: "fisica"
      })
    }
  }, [showDialog, id]);

  const handleClose = () => {
    router.back()
  };

  const SubmitNovoCliente = React.useCallback(
    (values: Cliente) => {
      props.submitAction(values);
      router.back();
    },
    [setError]
  );
  
  const SubmitEditCliente = (values: Cliente) => {
    if (cliente != null) {
      props.editAction(cliente, values);
    }
  };

  function habilitarEdicao() {
    setReadOnly(false);
  }


  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
    >
      <form onSubmit={modo == MODO.New ? handleSubmit(SubmitNovoCliente) : handleSubmit(SubmitEditCliente)}>
        <DialogTitle>{id == null ? "Adicionar Cliente" : "Teste"}</DialogTitle>
        <DialogContent >
          {isLoadingCliente && <CircularProgress />}
          {!isLoadingCliente && 
          <>
            <FormCliente readOnly={readOnly} control={control} errors={errors} register={register} tipoPessoa={tipoPessoa} />
          </>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {modo == MODO.Edit && <Button type="submit">Salvar</Button>}
          {modo == MODO.View && <Button onClick={habilitarEdicao}>Editar</Button>}
          {modo == MODO.New && <Button type="submit">Adicionar</Button>}
        </DialogActions>
      </form>
    </Dialog>
  )

}
const FormCliente = (props: { readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }): React.JSX.Element => {
  return (<>
    <FormDadosPessoa readOnly={props.readOnly} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} />

    <FormContato readOnly={props.readOnly} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} />

    <FormEndereco readOnly={props.readOnly} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} /> 
  </>

  )
}

const FormDadosPessoa = (props: { readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }) => {
  return (<>
    <Grid container spacing={2} marginTop={2} marginBottom={2}>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Tipo de pessoa</FormLabel>
            <Controller name="tipoPessoa" control={props.control}
              render={({ field }) => (
                <RadioGroup

                  row
                  {...field} // Spread field props to integrate React Hook Form
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel
                    disabled={props.readOnly}
                    value="fisica"
                    control={<Radio />}
                    label="Fisica"
                  />
                  <FormControlLabel
                    disabled={props.readOnly}
                    value="juridica"
                    control={<Radio />}
                    label="Juridica"
                  />
                </RadioGroup>
              )} />
          </FormControl>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        {props.tipoPessoa === "fisica" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField readOnly={props.readOnly} name="nome" register={props.register} label="Nome" error={(props.errors as any).nome} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField readOnly={props.readOnly} name="cpf" register={props.register} label="CPF" error={(props.errors as any).cpf} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField readOnly={props.readOnly} name="rg" register={props.register} label="RG" error={(props.errors as any).rg} />
            </Grid>
          </Grid>
        )}
        {props.tipoPessoa == "juridica" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField readOnly={props.readOnly} name="nomeFantasia" register={props.register} label="Nome Fantasia" error={(props.errors as any)?.nomeFantasia} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField readOnly={props.readOnly} name="cnpj" register={props.register} label="CNPJ" error={(props.errors as any).cnpj} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField readOnly={props.readOnly} name="razaoSocial" register={props.register} label="Nome Fantasia" error={(props.errors as any).razaoSocial} />
            </Grid>

          </Grid>
        )}
      </Grid >

    </Grid>
  </>)
}

const FormContato = (props: { readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }) => {

  return (<>
    <Grid container spacing={2} marginTop={1}>

      <Grid item xs={12}>
        <Typography >Contato</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="email" register={props.register} label="Email" error={props.errors.email} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="telefone" register={props.register} label="Telefone" error={props.errors.telefone} />
      </Grid>
    </Grid>
  </>)
}

const FormEndereco = (props: { readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }) => {

  return (<>
    <Grid container spacing={2} marginTop={1}>

      <Grid item xs={12}>
        <Typography >Localização</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="cep" register={props.register} label="CEP" error={props.errors.email} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="endereco" register={props.register} label="Endereço" error={props.errors.email} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="bairro" register={props.register} label="Bairro" error={props.errors.email} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="cidade" register={props.register} label="Cidade" error={props.errors.telefone} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField readOnly={props.readOnly} name="estado" register={props.register} label="Estado" error={props.errors.telefone} />
      </Grid>
    </Grid>
  </>)
}