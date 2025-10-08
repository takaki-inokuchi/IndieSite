import { Box, Heading, VStack } from "@chakra-ui/react";

export const BoardPage = () => {
  return (
    <Box w="100vw" minH="100vh" bg="gray.50" p={6}>
      <VStack
        spacing={4}
        maxW="600px"
        mx="auto"
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <Heading as="h1" size="lg" color="teal.600">
          Indie掲示板
        </Heading>
      </VStack>
    </Box>
  );
};
