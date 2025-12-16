import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  ModalCloseButton
} from '@chakra-ui/react'
import { Tarefa } from '../../tipos/tarefa'

interface Formulario {
  titulo: string
  descricao: string
  prioridade: 'baixa' | 'media' | 'alta'
  dataVencimento: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  tarefaEditando: Tarefa | null
  formulario: Formulario
  setFormulario: (f: Formulario) => void
  onSalvar: () => void
}

export function TaskModal({
  isOpen,
  onClose,
  tarefaEditando,
  formulario,
  setFormulario,
  onSalvar
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {tarefaEditando ? 'Editar Tarefa' : 'Nova Tarefa'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                placeholder="Ex: Estudar React"
                value={formulario.titulo}
                onChange={(e) =>
                  setFormulario({ ...formulario, titulo: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="Detalhes da tarefa..."
                value={formulario.descricao}
                onChange={(e) =>
                  setFormulario({ ...formulario, descricao: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Prioridade</FormLabel>
              <Select
                value={formulario.prioridade}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    prioridade: e.target.value as Formulario['prioridade']
                  })
                }
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Data de Vencimento</FormLabel>
              <Input
                type="date"
                value={formulario.dataVencimento}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    dataVencimento: e.target.value
                  })
                }
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={onSalvar}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
