import { Cliente } from "@/types/cliente"
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import FormTextField, { FormFieldProps, ReadOnlyFormFieldProps } from "../dashboard/formFields"

interface FormFieldControlProps extends FormFieldProps {
    tipoPessoa: string,
    control: Control<Cliente>,
    errors: FieldErrors<Cliente>
}
const EditClienteForm: React.FC<FormFieldProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldProps | ReadOnlyFormFieldProps | FormFieldControlProps) => {
    return (
        <>
            <FormDadosPessoa {...formFieldProps} />

            <FormContato {...formFieldProps} />

            <FormEndereco {...formFieldProps} />
        </>

    )
}

const FormDadosPessoa: React.FC<FormFieldControlProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldControlProps | ReadOnlyFormFieldProps) => {
    return (
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            {formFieldProps.type == "edit" && <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Tipo de pessoa</FormLabel>
                        <Controller name="tipoPessoa" control={formFieldProps.control}
                            render={({ field }) => (
                                <RadioGroup
                                    row
                                    {...field} // Spread field props to integrate React Hook Form
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                >
                                    <FormControlLabel
                                        disabled={false}
                                        value="fisica"
                                        control={<Radio />}
                                        label="Fisica"
                                    />
                                    <FormControlLabel
                                        disabled={false}
                                        value="juridica"
                                        control={<Radio />}
                                        label="Juridica"
                                    />
                                </RadioGroup>
                            )} />
                    </FormControl>
                </Stack>
                {formFieldProps.tipoPessoa === "juridica" && <FormDadosPessoaJuridica {...formFieldProps} />}
                {formFieldProps.tipoPessoa === "fisica" && <FormDadosPessoaFisica {...formFieldProps} />}
            </Grid>}

        </Grid>
    )
}

const FormDadosPessoaJuridica: React.FC<FormFieldControlProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldControlProps | ReadOnlyFormFieldProps) => {
    return (<>
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <Grid item xs={12}>
                {formFieldProps.type === "edit" && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormTextField type="edit" readOnly={false} name="nome" register={formFieldProps.register} label="Nome" error={(formFieldProps.errors as any).nome} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="cpf" register={formFieldProps.register} label="CPF" error={(formFieldProps.errors as any).cpf} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormTextField type="edit" readOnly={false} name="rg" register={formFieldProps.register} label="RG" error={(formFieldProps.errors as any).rg} />
                        </Grid>
                    </Grid>
                )}
            </Grid >
        </Grid>
    </>)
}

const FormDadosPessoaFisica: React.FC<FormFieldControlProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldControlProps | ReadOnlyFormFieldProps) => {
    return (<>
        <Grid container spacing={2} marginTop={2} marginBottom={2}>
            {formFieldProps.type === "edit" && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormTextField type="edit" readOnly={false} name="nomeFantasia" register={formFieldProps.register} label="Nome Fantasia" error={(formFieldProps.errors as any)?.nomeFantasia} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormTextField type="edit" readOnly={false} name="cnpj" register={formFieldProps.register} label="CNPJ" error={(formFieldProps.errors as any).cnpj} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormTextField type="edit" readOnly={false} name="razaoSocial" register={formFieldProps.register} label="Nome Fantasia" error={(formFieldProps.errors as any).razaoSocial} />
                    </Grid>

                </Grid>
            )}
        </Grid >

    </>)
}

const FormContato: React.FC<FormFieldProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldProps | ReadOnlyFormFieldProps) => {

    return (<>
        <Grid container spacing={2} marginTop={1}>

            <Grid item xs={12}>
                <Typography >Contato</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
        </Grid>
    </>)
}

const FormEndereco: React.FC<FormFieldProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldProps | ReadOnlyFormFieldProps) => {

    return (<>
        <Grid container spacing={2} marginTop={1}>

            <Grid item xs={12}>
                <Typography >Localização</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
            <Grid item xs={6}>
                <FormTextField {...formFieldProps} />
            </Grid>
        </Grid>
    </>)
}