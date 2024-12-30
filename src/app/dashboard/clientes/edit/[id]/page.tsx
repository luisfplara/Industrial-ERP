'use client'

import { getOneCliente } from "@/data/cliente";
import { Cliente, clienteSchema } from "@/types/cliente";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import { DocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { Control, Controller, FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { editClient } from "../../actions";
import { Stack } from "@mui/system";
import FormTextField from "@/components/dashboard/formFields";

export default function Page({
    params,
}: {
    params: { id: string }
}) {
    //const slug = (await params).id
    const id = params.id
    const [cliente, setCliente] = React.useState<Cliente>();
    const router = useRouter();
    const [isLoadingCliente, setIsLoadingCliente] = React.useState<boolean>(false);
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
    console.log("erros:", errors);
    let tipoPessoa = watch("tipoPessoa");
    React.useEffect(() => {
        if (id != null) {
            setIsLoadingCliente(true);

            getOneCliente(id).then((clienteDoc: DocumentSnapshot<Cliente>) => {
                console.log('clienteDoc.data(): ', clienteDoc.data());
                reset(Object.assign({ id: clienteDoc.id }, clienteDoc.data()));
                setCliente(Object.assign({ id: clienteDoc.id }, clienteDoc.data()));
                setIsLoadingCliente(false);
            });
        } else {

            reset({
                tipoPessoa: "fisica"
            })
        }
    }, [id]);

    const SubmitEditCliente = (values: any) => {
        console.log('valuesvaluesvalues: ', values);
        if (cliente != null) {
            editClient(cliente, values);
        }
    };

    //   const SubmitEditCliente = React.useCallback(
    //     (values: Cliente) => {
    //         console.log('valuesvaluesvalues: ', values);
    //         if (cliente != null) {
    //             editClient(cliente, values);
    //         }
    //     },
    //     [setError]
    //   );

    return <form onSubmit={handleSubmit(SubmitEditCliente)}>
        <Typography variant="h2">Editar Cliente</Typography>

        {isLoadingCliente? <CircularProgress />:<EditClienteForm control={control} errors={errors} register={register} tipoPessoa={tipoPessoa} />}

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


const EditClienteForm = (props: { tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }): React.JSX.Element => {
    return (
        <>
            <FormDadosPessoa readOnly={false} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} />

            <FormContato readOnly={false} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} />

            <FormEndereco readOnly={false} control={props.control} errors={props.errors} register={props.register} tipoPessoa={props.tipoPessoa} />
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

const FormEndereco = (props: { readOnly: boolean, tipoPessoa: string, register: UseFormRegister<Cliente>, control: Control<Cliente>, errors: FieldErrors<Cliente> }) => {

    return (<>
        <Grid container spacing={2} marginTop={1}>

            <Grid item xs={12}>
                <Typography >Localização</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.cep" register={props.register} label="CEP" error={props.errors.dadoEndereco?.cep} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.endereco" register={props.register} label="Endereço" error={props.errors.dadoEndereco?.endereco} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.numero" register={props.register} label="Número" error={props.errors.dadoEndereco?.numero} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.bairro" register={props.register} label="Bairro" error={props.errors.dadoEndereco?.bairro} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.cidade" register={props.register} label="Cidade" error={props.errors.dadoEndereco?.cidade} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField type="edit" readOnly={false} name="dadoEndereco.estado" register={props.register} label="Estado" error={props.errors.dadoEndereco?.estado} />
            </Grid>
        </Grid>
    </>)
}