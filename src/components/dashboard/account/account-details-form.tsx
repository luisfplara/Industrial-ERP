'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useUser } from '@/hooks/use-user';
import { z as zod } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import userFirebase from '@/data/user';
import { FormHelperText } from '@mui/material';

const schema = zod.object({
  email: zod.string().email("Email fora do padrão"),
  firstName: zod.string(),
  lastName: zod.string(),
  profilePic: zod.string(),
  telefone: zod.string().regex(/^[1-9]{2}9?[0-9]{8}$/, "Número incorreto"),
  estado: zod.string(),
  cidade: zod.string(),
});

type Values = zod.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const { user } = useUser();
  const defaultValues: Values = {
    email: user?.email || '', firstName: user?.firstName || '', lastName: user?.lastName || '', profilePic: user?.profilePic || '', telefone: user?.telefone || '',estado: user?.estado || '',cidade: user?.cidade || ''
  } satisfies Values;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: any): Promise<void> => {

      const modifiedFields = Object.keys(defaultValues).reduce<Partial<Values>>((acc, key) => {
        if (values[key as keyof Values] !== defaultValues[key as keyof Values]) {
          acc[key as keyof Values] = values[key as keyof Values];
        }
        return acc;
      }, {});
      await userFirebase.updateUser(user?.id || '', modifiedFields);
      location.reload();
    },
    [setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader subheader="Informações do perfil podem ser editadas" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Nome</InputLabel>
                <OutlinedInput   {...register("firstName")}
                  error={Boolean(errors.firstName)}
                  aria-errormessage={errors.firstName?.message} defaultValue={user?.firstName} label="Nome" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Sobrenome</InputLabel>
                <OutlinedInput {...register("lastName")}
                  error={Boolean(errors.lastName)}
                  aria-errormessage={errors.lastName?.message} defaultValue={user?.lastName} label="Sobrenome" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...register("email")}
                  error={Boolean(errors.email)}
                  aria-errormessage={errors.email?.message} defaultValue={user?.email} label="Email address" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Telefone</InputLabel>
                <OutlinedInput {...register("telefone")}
                  error={Boolean(errors.telefone)}
                  aria-errormessage={errors.telefone?.message} defaultValue={user?.telefone} label="Telefone" />
                {errors.telefone ? <FormHelperText>{errors.telefone.message}</FormHelperText> : null}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <OutlinedInput {...register("estado")}
                  error={Boolean(errors.estado)}
                  aria-errormessage={errors.estado?.message} defaultValue={user?.estado} label="Estado" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Cidade</InputLabel>
                <OutlinedInput {...register("cidade")}
                  error={Boolean(errors.cidade)}
                  aria-errormessage={errors.cidade?.message} defaultValue={user?.cidade} label="Cidade" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
