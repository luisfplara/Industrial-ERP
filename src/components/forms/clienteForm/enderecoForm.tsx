'use client'
import { getCidadeList } from "@/app/dashboard/clientes/actions";
import { Cidade } from "@/types/cidade";
import { Cliente } from "@/types/cliente";
import { CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import estados from "@/data/assets/estados.json"

export const LocalizacaoForm = ({ isReadOnly }: { isReadOnly?: boolean }) => {
  const { control, formState: { errors }, watch, setValue, setError } = useFormContext<Cliente>();
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [carregandoCep, setCarregandoCep] = useState<boolean>(false);
  const [carregandoCidade, setCarregandoCidade] = useState<boolean>(false);
  let watchCep = watch('dadoEndereco.cep');
  let estado = watch("dadoEndereco.estado");

  const buscarDadosPorCep = async () => {
    console.error("Buscando ceeeep:", watchCep);

    if (!/^\d{5}-?\d{3}$/.test(watchCep)) return; // Não faz busca se o CEP for inválido

    try {
      setCarregandoCep(true)
      const response = await fetch(`https://viacep.com.br/ws/${watchCep.replace('-', '')}/json/`);
      const data = await response.json();
      console.error("CEP data:", data);
      if (data.erro) {
        console.error("CEP não encontrado.");
        setError('dadoEndereco.cep', { message: "CEP não encontrado." })
        setValue('dadoEndereco.estado', "");
        setValue('dadoEndereco.cidade', "");
        setValue('dadoEndereco.bairro', "");
        setValue('dadoEndereco.endereco', "");
        setCarregandoCep(false)
        return;
      }
      setValue('dadoEndereco.estado', data.uf);
      setValue('dadoEndereco.cidade', data.ibge);
      setValue('dadoEndereco.bairro', data.bairro);
      setValue('dadoEndereco.endereco', data.logradouro);
      setCarregandoCep(false)

    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }

  };


  useEffect(() => {
    setCarregandoCidade(true);
    console.log("estadoestado->: ", estado);
    console.log("cidades->: ", cidades);
    estado && getCidadeList(estado).then((data) => {
      console.log("data->: ", data);
      setCarregandoCidade(false);
      setCidades(data)
    });
  }, [estado])

  return (
    <Grid container spacing={2} marginTop={2} marginBottom={2}>
      <Grid item xs={12}>
        <Typography >Endereço</Typography>
      </Grid>
      <Grid item xs={4}>
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100%' }} spacing={2} direction="row">
          <Controller
            disabled={isReadOnly}
            name="dadoEndereco.cep"
            control={control}
            render={({ field }) =>
              <TextField
                fullWidth {...field}
                label="CEP"
                error={!!errors.dadoEndereco?.cep}
                helperText={errors?.dadoEndereco?.cep?.message}
                onBlur={async () => await buscarDadosPorCep()}
              />}
          />{carregandoCep && <CircularProgress />}
        </Stack>
      </Grid>
      {!carregandoCep && <>
        <Grid item xs={4}>
          <Controller
            disabled={isReadOnly}
            name="dadoEndereco.estado"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Estado"
                error={!!errors.dadoEndereco?.estado}
                helperText={errors?.dadoEndereco?.estado?.message}
                {...field}
              >
                {estados.map((estado) => {
                  return <MenuItem key={estado.id} value={estado.uf}>{estado.nome}</MenuItem>
                })}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          {carregandoCidade ? <CircularProgress /> :
            <Controller
              disabled={isReadOnly}
              name="dadoEndereco.cidade"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label="Cidade"
                  error={!!errors.dadoEndereco?.cidade}
                  helperText={errors?.dadoEndereco?.cidade?.message}
                  {...field}
                >
                  {cidades.map((data) => {
                    return <MenuItem key={data.nome} value={data.cod_ibge}>{data.nome}</MenuItem>
                  })}
                </TextField>
              )}
            />}

        </Grid>
        <Grid item xs={5}>
          <Controller disabled={isReadOnly} name="dadoEndereco.bairro" control={control} render={({ field }) =>
            <TextField fullWidth {...field} label="Bairro" error={!!errors.dadoEndereco?.bairro} helperText={errors?.dadoEndereco?.bairro?.message} />} />
        </Grid>
        <Grid item xs={5}>
          <Controller disabled={isReadOnly} name="dadoEndereco.endereco" control={control} render={({ field }) =>
            <TextField fullWidth {...field} label="Endereço" error={!!errors.dadoEndereco?.endereco} helperText={errors?.dadoEndereco?.endereco?.message} />} />
        </Grid>
        <Grid item xs={2}>
          <Controller disabled={isReadOnly} name="dadoEndereco.numero" control={control} render={({ field }) =>
            <TextField fullWidth {...field} label="Número" error={!!errors.dadoEndereco?.numero} helperText={errors?.dadoEndereco?.numero?.message} />} />
        </Grid>
      </>}
    </Grid>

  );
};