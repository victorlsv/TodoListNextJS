import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: 'Lista de Tarefas',
  description: 'Aplicação para gerenciar tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}