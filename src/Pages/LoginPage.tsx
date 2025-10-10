import { Flex, Grid, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { FaGoogle, FaGithub, FaEnvelope } from "react-icons/fa";
import { AllLogin } from "../Auth/signInWithProvider";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      minH="80vh"
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
        <Heading as="h1" size="2xl" p={3} color="teal.700" textAlign="center">
          IndieSiteログイン
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
          <VStack w="70%" spacing={4} align="stretch">
            <Button
              leftIcon={<FaGoogle />}
              bg="#DB4437"
              color="white"
              _hover={{ bg: "#C33D2F" }}
              onClick={() => AllLogin("google")}
            >
              Google
            </Button>
            <Button
              leftIcon={<FaGithub />}
              bg="#333333"
              color="white"
              _hover={{ bg: "#242424" }}
              onClick={() => AllLogin("github")}
            >
              GitHub
            </Button>
            <Button
              leftIcon={<FaEnvelope />}
              bg="#FFD700"
              color="black"
              _hover={{ bg: "#FFC700" }}
              onClick={() => navigate("/EmailLoginPage")}
            >
              メール
            </Button>
          </VStack>
        </Flex>
      </VStack>
      <Text p={3} color="gray.600">
        新規ユーザーもこちらからログイン！
      </Text>
    </Flex>
  );
};
