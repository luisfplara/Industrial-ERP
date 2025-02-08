'use client'
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Grid } from '@mui/material';
import { Cliente } from '@/types/cliente';

export const PessoaForm = ({ isReadOnly }: { isReadOnly?: boolean }) => {
  const { control, watch, formState: { errors } } = useFormContext<Cliente>();
  const tipo = watch("tipoPessoa");

  return (
    <Grid container spacing={2} marginTop={2} marginBottom={2}>

      <Grid item xs={12} >
        <FormControl disabled={isReadOnly}>
          <FormLabel id="demo-row-radio-buttons-group-label">Tipo de pessoa</FormLabel>
          <Controller name="tipoPessoa" control={control}
            render={({ field }) => (
              <RadioGroup
                row
                {...field} // Spread field props to integrate React Hook Form
                aria-labelledby="demo-row-radio-buttons-group-label"
              >
                <FormControlLabel
                  disabled={isReadOnly}
                  value="fisica"
                  control={<Radio />}
                  label="Fisica"
                />
                <FormControlLabel
                  disabled={isReadOnly}
                  value="juridica"
                  control={<Radio />}
                  label="Juridica"
                />
              </RadioGroup>
            )} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {tipo === 'fisica' && (
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Controller disabled={isReadOnly} name="nome" control={control} render={({ field }) => <TextField fullWidth {...field} label="Nome" error={!!(errors as any).nome} helperText={(errors as any).nome?.message} />} />
            </Grid>
            <Grid item xs={6}>
              <Controller disabled={isReadOnly} name="cpf" control={control} render={({ field }) => <TextField fullWidth {...field} label="CPF" error={!!(errors as any).cpf} helperText={(errors as any).cpf?.message} />} />
            </Grid>
            <Grid item xs={6}>
              <Controller disabled={isReadOnly} name="rg" control={control} render={({ field }) => <TextField fullWidth {...field} label="RG" error={!!(errors as any).rg} helperText={(errors as any).rg?.message} />} />
            </Grid>
          </Grid>
        )}
        {tipo === 'juridica' && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller disabled={isReadOnly} name="nomeFantasia" control={control} render={({ field }) => <TextField fullWidth {...field} label="Nome Fantasia" error={!!(errors as any).nomeFantasia} helperText={(errors as any).nomeFantasia?.message} />} />
            </Grid>
            <Grid item xs={6}>
              <Controller disabled={isReadOnly} name="cnpj" control={control} render={({ field }) => <TextField fullWidth {...field} label="CNPJ" error={!!(errors as any).cnpj} helperText={(errors as any).cnpj?.message} />} />
            </Grid>
            <Grid item xs={6}>
              <Controller disabled={isReadOnly} name="razaoSocial" control={control} render={({ field }) => <TextField fullWidth {...field} label="Razão Social" error={!!(errors as any).razaoSocial} helperText={(errors as any).razaoSocial?.message} />} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>

  );
};