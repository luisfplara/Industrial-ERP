import { z as zod } from 'zod';
import { enderecoSchema } from './endereco';

const generalSchema = zod.object({
  id: zod.string().optional(),
  displayName: zod.string().optional(),
  telefone: zod.string().regex(/^[1-9]{2}9?[0-9]{8}$/, "Número incorreto"),
  email: zod.string().email("Email fora do padrão"),
  dadoEndereco: enderecoSchema,
});

// Campos específicos para pessoa física
const fisicaSchema = zod.object({
  tipoPessoa: zod.literal('fisica'),
  nome: zod.string().min(1, "Nome é obrigatório"),
  cpf: zod.string().min(11, "CPF deve ter pelo menos 11 dígitos").max(14, "CPF inválido"),
  rg: zod.string(),

}).merge(generalSchema);

// Campos específicos para pessoa jurídica
const juridicaSchema = zod.object({
  tipoPessoa: zod.literal('juridica'),
  nomeFantasia: zod.string().min(1, "Nome Fantasia é obrigatório"),
  cnpj: zod.string().min(14, "CNPJ deve ter pelo menos 14 dígitos").max(18, "CNPJ inválido"),
  razaoSocial: zod.string().min(1, "Razão Social é obrigatória"),
}).merge(generalSchema);

export const clienteSchema = zod.discriminatedUnion("tipoPessoa", [fisicaSchema, juridicaSchema]).transform((data) => ({
  ...data,
  displayName: `${data.tipoPessoa=="fisica"?data.nome: data.nomeFantasia}`,
}))

export type Cliente = zod.infer<typeof clienteSchema>;