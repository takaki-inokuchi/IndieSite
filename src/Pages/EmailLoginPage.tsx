import { useForm } from "react-hook-form";
import {
  Flex,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

interface FormData {
  email: string;
}

export const EmailLoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);
        toast({
          title: "ログイン成功！",
          description: `${user.email} としてログインしました`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    checkSession();
  }, [toast]);

  // ✅ Magic Link 送信処理
  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: "https://indiegame-hub.web.app/", // ログイン後に戻す先
      },
    });

    if (error) {
      toast({
        title: "送信失敗",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "メール送信完了！",
        description: "受信したリンクをクリックするとログインできます",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
        maxW="400px"
        w="100%"
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <Heading as="h1" size="2xl" color="teal.700" textAlign="center">
          メールログイン
        </Heading>

        {isLoggedIn ? (
          <Text color="teal.600" fontWeight="bold">
            ログイン済みです！
          </Text>
        ) : (
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email} mb={4}>
              <Input
                type="email"
                placeholder="メールアドレス"
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "有効なメールアドレスを入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              w="100%"
              isLoading={isSubmitting}
            >
              Link を送信
            </Button>
          </form>
        )}
      </VStack>
    </Flex>
  );
};
