'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  VStack,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { TaskList } from './components/TaskList'
import { TaskModal } from './components/TaskModal'
import { Footer } from './components/Footer'

import { Tarefa } from '../tipos/tarefa'

export default function PaginaPrincipal() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todas')
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas')
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null)

  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<string | null>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [formulario, setFormulario] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'media' as 'baixa' | 'media' | 'alta',
    dataVencimento: ''
  })

 /* salva localstorage... */
  useEffect(() => {
    const dados = localStorage.getItem('minhas_tarefas')
    if (dados) {
      setTarefas(JSON.parse(dados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas))
  }, [tarefas])

   /* açoes... */
  const abrirModalNovo = () => {
    setTarefaEditando(null)
    setFormulario({
      titulo: '',
      descricao: '',
      prioridade: 'media',
      dataVencimento: ''
    })
    onOpen()
  }

  const abrirModalEditar = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa)
    setFormulario({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
      dataVencimento: tarefa.dataVencimento || ''
    })
    onOpen()
  }

  const salvarTarefa = () => {
    if (!formulario.titulo.trim()) {
      toast({
        title: 'Erro',
        description: 'O título é obrigatório',
        status: 'error',
        duration: 3000
      })
      return
    }

    if (tarefaEditando) {
      setTarefas(tarefas.map(t =>
        t.id === tarefaEditando.id
          ? { ...t, ...formulario }
          : t
      ))
      toast({ title: 'Tarefa atualizada', status: 'success', duration: 2000 })
    } else {
      setTarefas([
        {
          id: Date.now().toString(),
          status: 'pendente',
          dataCriacao: new Date().toISOString(),
          ...formulario
        },
        ...tarefas
      ])
      toast({ title: 'Tarefa criada', status: 'success', duration: 2000 })
    }

    onClose()
  }

  const excluirTarefa = (id: string) => {
    setTarefaParaExcluir(id)
  }

  const confirmarExclusao = () => {
    if (!tarefaParaExcluir) return

    setTarefas(tarefas.filter(t => t.id !== tarefaParaExcluir))
    setTarefaParaExcluir(null)

    toast({
      title: 'Tarefa excluída',
      status: 'info',
      duration: 2000
    })
  }

  const alternarStatus = (id: string) => {
    setTarefas(tarefas.map(t =>
      t.id === id
        ? {
            ...t,
            status: t.status === 'pendente' ? 'concluida' : 'pendente',
            dataConclusao:
              t.status === 'pendente'
                ? new Date().toISOString()
                : undefined
          }
        : t
    ))
  }

 /* filtros... */
  const tarefasFiltradas = tarefas.filter(t => {
    const buscaOk =
      t.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      t.descricao.toLowerCase().includes(busca.toLowerCase())

    const statusOk = filtroStatus === 'todas' || t.status === filtroStatus
    const prioridadeOk =
      filtroPrioridade === 'todas' || t.prioridade === filtroPrioridade

    return buscaOk && statusOk && prioridadeOk
  })

  const totalPendentes = tarefas.filter(t => t.status === 'pendente').length
  const totalConcluidas = tarefas.filter(t => t.status === 'concluida').length

  /* renderiza... */
  return (
    <Box
      minH="100vh"
      py={8}
      bgGradient="linear(to-br, blue.50, blue.100)"
    >
      <Container maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Header
            total={tarefas.length}
            pendentes={totalPendentes}
            concluidas={totalConcluidas}
          />

          <Filters
            busca={busca}
            setBusca={setBusca}
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
            filtroPrioridade={filtroPrioridade}
            setFiltroPrioridade={setFiltroPrioridade}
          />

          <Button
            colorScheme="blue"
            size="lg"
            leftIcon={<AddIcon />}
            onClick={abrirModalNovo}
          >
            Nova Tarefa
          </Button>

          <TaskList
            tarefas={tarefasFiltradas}
            onEditar={abrirModalEditar}
            onExcluir={excluirTarefa}
            onAlternarStatus={alternarStatus}
          />
        </VStack>

        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          tarefaEditando={tarefaEditando}
          formulario={formulario}
          setFormulario={setFormulario}
          onSalvar={salvarTarefa}
        />

        <Footer />
      </Container>

     
      <AlertDialog
        isOpen={!!tarefaParaExcluir}
        leastDestructiveRef={cancelRef}
        onClose={() => setTarefaParaExcluir(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir tarefa
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir esta tarefa?
              Essa ação não poderá ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setTarefaParaExcluir(null)}>
                Cancelar
              </Button>
              <Button colorScheme="red" ml={3} onClick={confirmarExclusao}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
