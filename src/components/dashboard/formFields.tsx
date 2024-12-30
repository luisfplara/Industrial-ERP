import React from "react";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Control, FieldError, UseFormRegister } from "react-hook-form";
import { string } from "zod";
import { Cliente } from "@/types/cliente";

export interface FormFieldProps {
    type: "edit";
    name: string;
    label: string;
    register: UseFormRegister<any>; // Generic type for reusability
    error?: FieldError;
    readOnly: boolean
}

export interface ReadOnlyFormFieldProps {
    type: "view";
    label: string;
    value: string;
}

const FormTextField: React.FC<FormFieldProps | ReadOnlyFormFieldProps> = (formFieldProps: FormFieldProps | ReadOnlyFormFieldProps) => {
    return (
        <>
            {formFieldProps.type == "edit" &&
                <FormControl fullWidth>
                    <TextField helperText={formFieldProps.error?.message} disabled={formFieldProps.readOnly} {...formFieldProps.register(formFieldProps.name)} label={formFieldProps.label} variant="outlined" error={Boolean(!!formFieldProps.error)} />
                </FormControl>}
            {formFieldProps.type == "view" &&
                <FormControl fullWidth>
                    <TextField disabled={true} label={formFieldProps.label}  value={formFieldProps.value} />
                </FormControl>}
        </>
    );
};

export default FormTextField;