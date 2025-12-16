import {
  Card,
  CardBody,
  Input,
  Stack,
  HStack,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
  busca: string
  setBusca: (v: string) => void
  filtroStatus: string
  setFiltroStatus: (v: string) => void
  filtroPrioridade: string
  setFiltroPrioridade: (v: string) => void
}

export function Filters({
  busca,
  setBusca,
  filtroStatus,
  setFiltroStatus,
  filtroPrioridade,
  setFiltroPrioridade
}: Props) {
  return (
    <Card boxShadow="sm">
      <CardBody>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar tarefas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </InputGroup>

          <HStack spacing={3}>
            <Select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="concluida">Concluídas</option>
            </Select>

            <Select
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
            >
              <option value="todas">Todas Prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </Select>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}
