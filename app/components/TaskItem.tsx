import {
  Card,
  CardBody,
  Flex,
  HStack,
  VStack,
  Text,
  Badge,
  IconButton,
  Checkbox,
  Box,
  Tooltip
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Tarefa } from '../../tipos/tarefa'

interface Props {
  tarefa: Tarefa
  onEditar: () => void
  onExcluir: () => void
  onAlternarStatus: () => void
}

export function TaskItem({
  tarefa,
  onEditar,
  onExcluir,
  onAlternarStatus
}: Props) {
  const corPrioridade =
    tarefa.prioridade === 'alta'
      ? 'red'
      : tarefa.prioridade === 'media'
      ? 'yellow'
      : 'green'

  return (
    <Card
      position="relative"
      borderLeft="6px solid"
      borderLeftColor={`${corPrioridade}.400`}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg'
      }}
      opacity={tarefa.status === 'concluida' ? 0.6 : 1}
    >
      <CardBody>
        <Flex justify="space-between" gap={4}>
          <HStack align="start" spacing={4} flex={1}>
            <Checkbox
              isChecked={tarefa.status === 'concluida'}
              onChange={onAlternarStatus}
              colorScheme="green"
              mt={1}
            />

            <VStack align="start" spacing={1} flex={1}>
              <Text
                fontWeight="semibold"
                fontSize="md"
                textDecoration={
                  tarefa.status === 'concluida' ? 'line-through' : 'none'
                }
              >
                {tarefa.titulo}
              </Text>

              {tarefa.descricao && (
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {tarefa.descricao}
                </Text>
              )}

              <HStack spacing={2} pt={1}>
                <Badge colorScheme={corPrioridade} variant="subtle">
                  {tarefa.prioridade}
                </Badge>

                {tarefa.dataVencimento && (
                  <Badge colorScheme="purple" variant="outline">
                    Vence:{' '}
                    {new Date(tarefa.dataVencimento).toLocaleDateString()}
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>

          <HStack>
            <Tooltip label="Editar tarefa">
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                onClick={onEditar}
              />
            </Tooltip>

            <Tooltip label="Excluir tarefa">
              <IconButton
                aria-label="Excluir"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={onExcluir}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  )
}
