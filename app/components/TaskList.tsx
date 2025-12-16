import { VStack, Box, Text } from '@chakra-ui/react'
import { Tarefa } from '../../tipos/tarefa'
import { TaskItem } from './TaskItem'

interface Props {
  tarefas: Tarefa[]
  onEditar: (t: Tarefa) => void
  onExcluir: (id: string) => void
  onAlternarStatus: (id: string) => void
}

export function TaskList({ tarefas, onEditar, onExcluir, onAlternarStatus }: Props) {
  if (tarefas.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500">Nenhuma tarefa encontrada</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={3} align="stretch">
      {tarefas.map(tarefa => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onEditar={() => onEditar(tarefa)}
          onExcluir={() => onExcluir(tarefa.id)}
          onAlternarStatus={() => onAlternarStatus(tarefa.id)}
        />
      ))}
    </VStack>
  )
}
