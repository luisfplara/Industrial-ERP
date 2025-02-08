'use server'

import cidades from "@/data/assets/cidades.json"
import estado from "@/data/assets/estados.json"
import { Cidade } from "@/types/cidade";
import { Estado } from "@/types/estado";

export async function getCidadeList(uf: string):Promise<Cidade[]> {
  const ufId:Estado[]= estado.filter(
    function(data){ return data.uf == uf })

  return cidades.filter(
    function(data){ return data.id == ufId[0]?.id }
);

}