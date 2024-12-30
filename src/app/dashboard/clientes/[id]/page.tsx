import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Control, Controller, FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/system";
import FormTextField, { FormFieldProps} from "@/components/dashboard/formFields";
import { Cliente, clienteSchema, } from "@/types/cliente";
import { getOneCliente } from "@/data/cliente";
import { DocumentSnapshot } from "firebase/firestore";
import { redirect } from 'next/navigation'
import Link from "next/link";

export default async function AdicionarClienteDialog({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  //console.log((await params).id);
  const idParam = (await params).id;

  const clienteDoc: DocumentSnapshot<Cliente> = await getOneCliente(idParam);

  return (


    <form>
      <Typography variant="h2">Cliente</Typography>
      <FormCliente {...clienteDoc.data() as Cliente} />
      <Stack direction="row" spacing={2}
        sx={{
          justifyContent: "end",
          alignItems: "center",
          marginTop: 2
        }}>
        <Link href={"./"}>
          <Button variant="outlined">Voltar</Button>
        </Link>
        <Link href={"./edit/" + idParam}>
          <Button variant="contained">Editar</Button>
        </Link>

      </Stack>
    </form>

  )

}

const FormCliente: React.FC<Cliente> = (cliente: Cliente): React.JSX.Element => {
  return (<>
    <FormDadosPessoa {...cliente} />

    <FormContato {...cliente} />

    <FormEndereco {...cliente} />
  </>

  )
}

const FormDadosPessoa: React.FC<Cliente> = (cliente: Cliente) => {
  return (<>
    <Grid container spacing={2} marginTop={2} marginBottom={2}>

      <Grid item xs={12}>
        {cliente.tipoPessoa === "fisica" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField type="view" label="Nome" value={cliente.nome} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField type="view" label="CPF" value={cliente.cpf} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField type="view" label="RG" value={cliente.rg} />
            </Grid>
          </Grid>
        )}
        {cliente.tipoPessoa == "juridica" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField type="view" label="Nome Fantasia" value={cliente.nomeFantasia} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField type="view" label="CNPJ" value={cliente.cnpj} />
            </Grid>
            <Grid item xs={6}>
              <FormTextField type="view" label="Razão social" value={cliente.razaoSocial} />
            </Grid>

          </Grid>
        )}
      </Grid >

    </Grid>
  </>)
}

const FormContato = (cliente: Cliente) => {

  return (<>
    <Grid container spacing={2} marginTop={1}>

      <Grid item xs={12}>
        <Typography >Contato</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Email" value={cliente.email} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Telefone" value={cliente.telefone} />
      </Grid>
    </Grid>
  </>)
}

const FormEndereco = (cliente: Cliente) => {

  return (<>
    <Grid container spacing={2} marginTop={1}>

      <Grid item xs={12}>
        <Typography >Localização</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="CEP" value={cliente.dadoEndereco?.cep} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Endereço" value={cliente.dadoEndereco?.endereco} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Bairro" value={cliente.dadoEndereco?.bairro} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Cidade" value={cliente.dadoEndereco?.cidade} />
      </Grid>
      <Grid item xs={6}>
        <FormTextField type="view" label="Estado" value={cliente.dadoEndereco?.estado} />
      </Grid>
    </Grid>
  </>)
}