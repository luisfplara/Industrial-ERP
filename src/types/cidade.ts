import { z as zod } from 'zod';

const cidadeSchema = zod.object({
    id: zod.number(),
    cod_ibge: zod.string(),
    nome: zod.string(),
});

export type Cidade = zod.infer<typeof cidadeSchema>;