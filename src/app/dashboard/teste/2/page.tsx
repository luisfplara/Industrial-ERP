'use client'

import { ClienteForm } from "@/components/forms/clienteForm/clienteForm";
import { getOneCliente } from "@/data/cliente";
import { Cliente } from "@/types/cliente";
import React, { useEffect, useState } from "react";

export default function Page(): React.JSX.Element {
    function handleSave(params: Cliente) {
        console.log(params)
    }
    const [cliente, setCliente] = useState<Cliente>();
    const id = "NHjyb141xLYba46jXlRG"
    useEffect(() => {
        getOneCliente(id).then((data) => {
            console.log(data.data());
            setCliente(data.data());
        }

        );
    }, [id])
    return <>
        {cliente && <ClienteForm
            openMode="edit"
            onSubmit={handleSave}
            defaultValues={cliente}
        />}

    </>
}