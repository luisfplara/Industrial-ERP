import React from "react";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
    name: string;
    label: string;
    register: UseFormRegister<any>; // Generic type for reusability
    error?: FieldError;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, register, error }) => {
    return (

        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput   {...register(name)}
                error={Boolean(!!error)}
                aria-errormessage={error?.message} label="Nome" />
            {!!error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>

    );
};

/* <TextField
      label={label}
      fullWidth
      margin="normal"
      {...register(name)}
      error={!!error}
      helperText={error?.message}
    /> */
export default FormField;