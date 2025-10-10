import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import type { IndieGame } from "../types/types";

interface Props {
  game: IndieGame;
  rank: number;
}

export const GameCard: React.FC<Props> = ({ game, rank }) => {
  return (
    <Link href={game.url} isExternal>
      <Box
        h="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        p={4}
        _hover={{ shadow: "xl" }}
        transition="0.2s"
      >
        <Box position="relative">
          <Image
            src={game.header_image}
            alt={game.name}
            w="100%"
            objectFit="cover"
            mb={3}
          />
          <Box
            position="absolute"
            top={1}
            left={1}
            bg="teal.300"
            color="white"
            fontWeight="bold"
            px={3}
            py={1}
            borderRadius="md"
            fontSize="sm"
          >
            #{rank}
          </Box>
        </Box>
        <Heading as="h3" size="md" mb={2}>
          {game.name}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          製作者: {game.developers.join(", ")}
        </Text>
        <Text fontSize="sm" color="gray.600">
          リリース日: {game.release_date}
        </Text>
        <Text>{game.short_description}</Text>
      </Box>
    </Link>
  );
};
