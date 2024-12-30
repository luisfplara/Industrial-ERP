'use client'

import { getOneCliente, updateCliente } from "@/data/cliente";
import { Cliente, clienteSchema } from "@/types/cliente";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import { DocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { Control, Controller, FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { newClient, getCidadeList } from "../actions";
import { Stack } from "@mui/system";
import FormTextField from "@/components/dashboard/formFields";
import estados from "@/data/assets/estados.json"
import { Cidade } from "@/types/cidade";
export default function Page() {

    const router = useRouter();
    const [cidades, setCidades] = React.useState<Cidade[]>([]);
    const [carregandoCidade, setCarregandoCidade] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue
    } = useForm<Cliente>({
        resolver: zodResolver(clienteSchema), defaultValues: {
            tipoPessoa: "fisica",
            dadoEndereco: { cidade: "", estado: "", endereco: "", bairro: "" }
        }
    });

    console.log("erros:", errors);

    let tipoPessoa = watch("tipoPessoa");
    let estado = watch("dadoEndereco.estado");
    let watchCep = watch('dadoEndereco.cep');

    const SubmitNewCliente = (newCliente: Cliente) => {
        console.log('newClientenewClientenewCliente: ', newCliente);

        newClient(newCliente);

    };

    const buscarDadosPorCep = async () => {
        console.error("Buscando ceeeep:", watchCep);
        if (!/^\d{5}-?\d{3}$/.test(watchCep)) return; // Não faz busca se o CEP for inválido

        try {
            const response = await fetch(`https://viacep.com.br/ws/${watchCep.replace('-', '')}/json/`);
            const data = await response.json();
            console.error("CEP data:", data);
            if (data.erro) {
                console.error("CEP não encontrado.");
                return;
            }
            console.log('dadoEndereco.estado', data.uf);
            console.log('dadoEndereco.cidade', data.ibge);
            setValue('dadoEndereco.estado', data.uf);
            setValue('dadoEndereco.cidade', data.ibge);
            setValue('dadoEndereco.bairro', data.bairro);
            setValue('dadoEndereco.endereco', data.logradouro);
            errors.dadoEndereco

        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
        }
    };

    React.useEffect(() => {
        console.log("estado->:", estado);
        setCarregandoCidade(true);
        getCidadeList(estado).then((data) => {
            setCarregandoCidade(false);
            console.log("cidades->:", cidades);
            setCidades(data)
        });
    }, [estado])

    return <form onSubmit={handleSubmit(SubmitNewCliente)}>
        <Typography variant="h2">Novo Cliente</Typography>

        <FormDadosPessoa readOnly={false} control={control} errors={errors} register={register} tipoPessoa={tipoPessoa} />

        <FormContato readOnly={false} control={control} errors={errors} register={register} tipoPessoa={tipoPessoa} />

        <FormEndereco buscarDadosPorCep={buscarDadosPorCep} carregandoCidade={carregandoCidade} cidades={cidades} readOnly={false} control={control} errors={errors} register={register} tipoPessoa={tipoPessoa} />

        <Stack direction="row" spacing={2}
            sx={{
                justifyContent: "end",
                alignItems: "center",
                marginTop: 2
            }}>
            <Button variant="outlined" onClick={() => { router.back(); }}>Cancel</Button>
            <Button variant="contained" type="submit">Salvar</Button>
        </Stack>
    </form>
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
                            <FormTextField type="edit" readOnly={false} name="nome" register={props.register} label="Nome" error={(props.errors as any).nome} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="cpf" register={props.register} label="CPF" error={(props.errors as any).cpf} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="rg" register={props.register} label="RG" error={(props.errors as any).rg} />
                        </Grid>
                    </Grid>
                )}
                {props.tipoPessoa == "juridica" && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormTextField type="edit" readOnly={false} name="nomeFantasia" register={props.register} label="Nome Fantasia" error={(props.errors as any)?.nomeFantasia} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="cnpj" register={props.register} label="CNPJ" error={(props.errors as any).cnpj} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="razaoSocial" register={props.register} label="Nome Fantasia" error={(props.errors as any).razaoSocial} />
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
                <FormTextField type="edit" readOnly={false} name="email" register={props.register} label="Email" error={props.errors.email} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="telefone" register={props.register} label="Telefone" error={props.errors.telefone} />
            </Grid>
        </Grid>
    </>)
}

const FormEndereco = (props: { buscarDadosPorCep: () => Promise<void>, carregandoCidade: boolean, cidades: Cidade[], readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }) => {

    return (<>
        <Grid container spacing={2} marginTop={1}>

            <Grid item xs={12}>
                <Typography >Localização</Typography>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="CEP"
                    variant="outlined"
                    error={!!props.errors?.dadoEndereco?.cep}
                    helperText={props.errors?.dadoEndereco?.cep?.message}
                    {...props.register('dadoEndereco.cep')}
                    onBlur={async () => await props.buscarDadosPorCep()}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dadoEndereco.estado"
                    control={props.control}
                    render={({ field }) => (
                        <TextField
                            select
                            fullWidth
                            label="Estado"
                            defaultValue=""
                            error={!!props.errors.dadoEndereco?.estado}
                            helperText={props.errors?.dadoEndereco?.estado?.message}
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
                {props.carregandoCidade ? <CircularProgress /> :
                    <Controller
                        name="dadoEndereco.cidade"
                        control={props.control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                select
                                label="Cidade"
                                defaultValue=""
                                disabled={props.cidades.length == 0}
                                error={!!props.errors.dadoEndereco?.cidade}
                                helperText={props.errors?.dadoEndereco?.cidade?.message}
                                {...field}
                            >
                                {props.cidades.map((data) => {
                                    return <MenuItem key={data.nome} value={data.cod_ibge}>{data.nome}</MenuItem>
                                })}
                            </TextField>
                        )}
                    />}

            </Grid>
            <Grid item xs={5}>
                <Controller
                    name="dadoEndereco.bairro"
                    control={props.control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Bairro"
                            variant="outlined"
                            error={!!props.errors.dadoEndereco?.bairro}
                            helperText={props.errors.dadoEndereco?.bairro?.message}
                            {...field}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={5}>
                <Controller
                    name="dadoEndereco.endereco"
                    control={props.control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Endereco"
                            variant="outlined"
                            error={!!props.errors.dadoEndereco?.endereco}
                            helperText={props.errors.dadoEndereco?.endereco?.message}
                            {...field}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label="Número"
                    variant="outlined"
                    helperText={props.errors.dadoEndereco?.numero?.message}
                    error={Boolean(!!props.errors.dadoEndereco?.numero)}
                    {...props.register("dadoEndereco.numero")}                    
                />
            </Grid>
        </Grid>
    </>)
}




{/* <Select
label="aaaaaaaaaaaaaa"
{...props.register('dadoEndereco.cidade')}
>
<MenuItem value="option1">Option 1</MenuItem>
<MenuItem value="option2">Option 2</MenuItem>
</Select>
<FormHelperText>{props.errors?.dadoEndereco?.cidade?.message}</FormHelperText> */}