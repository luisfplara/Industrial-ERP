import React from "react";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
    name: string;
    label: string;
    register: UseFormRegister<any>; // Generic type for reusability
    error?: FieldError;
    readOnly:boolean
}

const FormTextField: React.FC<FormFieldProps> = ({ name, label, register, error, readOnly }) => {
    return (

        <FormControl fullWidth>
             <TextField disabled={readOnly} {...register(name)}  label={label} variant="outlined"    error={Boolean(!!error)}/>
             {!!error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>

    );
};

export default FormTextField;