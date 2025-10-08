import { Flex, Grid, Button, Heading } from "@chakra-ui/react";
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
      w="100vw"
      h="90vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      direction="column"
    >
      {/* タイトル */}
      <Heading as="h1" size="2xl" p={4} color="teal.700" textAlign="center">
        IndieSite ログイン
      </Heading>
      <Flex
        w="90%"
        maxW="400px"
        direction="column"
        align="center"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="xl"
      >
        {/* 6つのログインボタン */}
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
    </Flex>
  );
};
