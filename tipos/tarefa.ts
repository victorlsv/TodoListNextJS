export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  prioridade: 'baixa' | 'media' | 'alta'
  status: 'pendente' | 'concluida'
  dataCriacao: string
  dataVencimento?: string
  dataConclusao?: string
}