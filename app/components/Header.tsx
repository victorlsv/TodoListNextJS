import {
  Box,
  Heading,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'

interface Props {
  total: number
  pendentes: number
  concluidas: number
}

export function Header({ total, pendentes, concluidas }: Props) {
  return (
    <Box
      bgGradient="linear(to-r, blue.600, blue.400)"
      borderRadius="xl"
      p={8}
      color="white"
      boxShadow="lg"
    >
      <Heading size="xl" mb={6} textAlign="center">
        ToDo List IM
      </Heading>

      <HStack
        justify="space-around"
        spacing={6}
        flexWrap="wrap"
      >
        <Stat textAlign="center">
          <StatLabel color="blue.100">Total</StatLabel>
          <StatNumber fontSize="2xl">{total}</StatNumber>
        </Stat>

        <Stat textAlign="center">
          <StatLabel color="blue.100">Pendentes</StatLabel>
          <StatNumber fontSize="2xl" color="orange.200">
            {pendentes}
          </StatNumber>
        </Stat>

        <Stat textAlign="center">
          <StatLabel color="blue.100">Concluídas</StatLabel>
          <StatNumber fontSize="2xl" color="green.200">
            {concluidas}
          </StatNumber>
        </Stat>
      </HStack>

      <Text
        textAlign="center"
        mt={4}
        fontSize="sm"
        color="blue.100"
      >
        Organize suas tarefas de forma simples e eficiente
      </Text>
    </Box>
  )
}
