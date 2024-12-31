'use client'
import { Cliente } from "@/types/cliente";
import { Grid, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const ContatoForm = ({ isReadOnly }: { isReadOnly?: boolean }) => {
  const { control, formState: { errors } } = useFormContext<Cliente>();

  return (
    <Grid container spacing={2} marginTop={2} marginBottom={2}>
      <Grid item xs={12}>
        <Typography >Contato</Typography>
      </Grid>
      <Grid item xs={6}>
        <Controller disabled={isReadOnly} name="email" control={control} render={({ field }) => <TextField fullWidth {...field} label="E-mail" error={!!errors.email} helperText={errors?.email?.message} />} />
      </Grid>
      <Grid item xs={6}>
        <Controller disabled={isReadOnly} name="telefone" control={control} render={({ field }) => <TextField fullWidth {...field} label="Telefone" error={!!errors.telefone} helperText={errors?.telefone?.message} />} />
      </Grid>
    </Grid>
  );
};