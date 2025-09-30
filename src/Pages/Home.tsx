import { Box, Heading, Text } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Box p={4} bg="gray.100">
      <Heading as="h1" size="4xl" color="teal.700">
        IndieGameSite
      </Heading>
      <Text p={6} fontSize="2xl">
        今週のランキングを表示
      </Text>
    </Box>
  );
};
