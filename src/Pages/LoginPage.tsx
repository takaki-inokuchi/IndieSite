import { Flex, Grid, Button, Heading, VStack } from "@chakra-ui/react";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaApple,
  FaEnvelope,
} from "react-icons/fa";

export const LoginPage = () => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      justify="center"
      align="center"
      bg="gray.50"
      px={4}
    >
      <VStack
        spacing={4}
        maxW="600px"
        w="100%"
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <Heading as="h1" size="2xl" p={4} color="teal.700" textAlign="center">
          IndieSite ログイン
        </Heading>
        <Flex
          w="90%"
          maxW="400px"
          direction="column"
          align="center"
          justify="center"
          p={8}
          bg="white"
          borderRadius="lg"
          shadow="xl"
        >
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={4}>
            <Button
              leftIcon={<FaGoogle />}
              bg="#DB4437"
              color="white"
              _hover={{ bg: "#C33D2F" }}
            >
              Google
            </Button>
            <Button
              leftIcon={<FaGithub />}
              bg="#333333"
              color="white"
              _hover={{ bg: "#242424" }}
            >
              GitHub
            </Button>
            <Button
              leftIcon={<FaEnvelope />}
              bg="#FFD700"
              color="black"
              _hover={{ bg: "#FFC700" }}
            >
              メール
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              bg="#1877F2"
              color="white"
              _hover={{ bg: "#155DB6" }}
            >
              Facebook
            </Button>
            <Button
              leftIcon={<FaTwitter />}
              bg="#1DA1F2"
              color="white"
              _hover={{ bg: "#0d95e8" }}
            >
              Twitter
            </Button>
            <Button
              leftIcon={<FaApple />}
              bg="black"
              color="white"
              _hover={{ bg: "#333333" }}
            >
              Apple
            </Button>
          </Grid>
        </Flex>
      </VStack>
    </Flex>
  );
};
