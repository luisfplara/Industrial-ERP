import { z as zod } from 'zod';

export const enderecoSchema = zod.object({
  cep: zod.string().min(1, { message: 'CEP é necessário' }),
  endereco: zod.string().min(1, { message: 'Endereco é necessário' }),
  numero: zod.string().min(1, { message: 'Numero é necessário' }),
  bairro: zod.string().min(1, { message: 'Bairro é necessário' }),
  cidade: zod.string().min(1, { message: 'Selecione uma cidade' }),
  estado: zod.string().min(1, { message: 'Selecione um estado' }),
});

export type Endereco = zod.infer<typeof enderecoSchema>;