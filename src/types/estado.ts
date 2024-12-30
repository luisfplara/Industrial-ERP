import { z as zod } from 'zod';

const cidadeSchema = zod.object({
    id: zod.number(),
    uf: zod.string(),
    nome: zod.string(),
});

export type Estado = zod.infer<typeof cidadeSchema>;