'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { z as zod } from 'zod';
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/system";
import FormField from "../formFields";

const clienteSchema = zod.object({
  nome: zod.string().min(1, { message: 'Nome é necessário' }),
  cpf: zod.string().min(1, { message: 'CPF é necessário' }),
  rg: zod.string(),
  telefone: zod.string().regex(/^[1-9]{2}9?[0-9]{8}$/, "Número incorreto"),
  email: zod.string().email("Email fora do padrão"),
  endereco: zod.string().min(1, { message: 'Endereco é necessário' }),
});

// Campos específicos para pessoa física
const fisicaSchema = zod.object({
  nome: zod.string().min(1, "Nome é obrigatório"),
  cpf: zod.string().min(11, "CPF deve ter pelo menos 11 dígitos").max(14, "CPF inválido"),

});

// Campos específicos para pessoa jurídica
const juridicaSchema = zod.object({
  nomeFantasia: zod.string().min(1, "Nome Fantasia é obrigatório"),
  cnpj: zod.string().min(14, "CNPJ deve ter pelo menos 14 dígitos").max(18, "CNPJ inválido"),
  razaoSocial: zod.string().min(1, "Razão Social é obrigatória"),
});


const clientePessoaFisicaSchema = fisicaSchema.merge(clienteSchema);
const clientePessoaJuridicaSchema = juridicaSchema.merge(clienteSchema);

// Inferindo tipos para ambos os casos

type FisicaFormData = zod.infer<typeof clientePessoaFisicaSchema>;
type JuridicaFormData = zod.infer<typeof clientePessoaJuridicaSchema>;
type FormData = FisicaFormData | JuridicaFormData
export default function AdicionarClienteDialog(props: { submitAction: (event: FormData) => {} }) {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState<boolean>(false)
  const search = searchParams.get('addDialog')
  const [tipoPessoa, setTipoPessoa] = React.useState('fisica');

  const selectedSchema = tipoPessoa === "fisica" ? clientePessoaFisicaSchema : clientePessoaJuridicaSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FisicaFormData | JuridicaFormData>({ resolver: zodResolver(selectedSchema) });


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

  const onSubmit = React.useCallback(
    async (values: any): Promise<void> => {
      props.submitAction(values);
      handleClose()
    },
    [setError]
  );

  const handletipoPessoa = (
    event: React.MouseEvent<HTMLElement>,
    newtipoPessoa: string | null,
  ) => {
    if (newtipoPessoa !== null) {
      setTipoPessoa(newtipoPessoa);
    }
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Adicionar Cliente</DialogTitle>
        <DialogContent >
          <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Typography alignContent={"center"}>Tipo de pessoa</Typography>

                <ToggleButtonGroup
                  value={tipoPessoa}
                  onChange={handletipoPessoa}
                  color="primary"
                  exclusive
                  aria-label="Platform"
                >
                  <ToggleButton value="fisica">Física</ToggleButton>
                  <ToggleButton value="juridica">Juridica</ToggleButton>

                </ToggleButtonGroup>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {tipoPessoa === 'fisica' ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormField name="nome" register={register} label="Nome" error={errors.nome} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField name="cpf" register={register} label="CPF" error={errors.cpf} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField name="rg" register={register} label="RG" error={errors.rg} />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormField name="nomeFantasia" register={register} label="Nome Fantasia" error={errors ?.nomeFantasia} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField name="cnpj" register={register} label="CNPJ" error={errors.cnpj} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField name="razaoSocial" register={register} label="Nome Fantasia" error={errors.razaoSocial} />
                  </Grid>

                </Grid>
              )}
            </Grid >

          </Grid>

          <Divider textAlign="left" />

          <Grid container spacing={2} marginTop={1}>

            <Grid item xs={12}>
              <Typography >Contato</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormField name="email" register={register} label="Email" error={errors.email} />
            </Grid>
            <Grid item xs={6}>
              <FormField name="telefone" register={register} label="Telefone" error={errors.telefone} />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>



            <FormControl fullWidth>
              <InputLabel>Endereco</InputLabel>
              <OutlinedInput   {...register("endereco")}
                error={Boolean(errors.endereco)}
                aria-errormessage={errors.endereco?.message} label="Nome" />
              {errors.endereco ? <FormHelperText>{errors.endereco.message}</FormHelperText> : null}
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Adicionar</Button>
        </DialogActions>
      </form>
    </Dialog>
  )

}
