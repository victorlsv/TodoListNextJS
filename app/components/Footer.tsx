import { Box, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box
      mt={12}
      py={4}
      textAlign="center"
      color="gray.500"
      fontSize="sm"
    >
      © {new Date().getFullYear()} Victor Lara Silva.
    </Box>
  )
}
