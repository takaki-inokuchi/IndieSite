import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { UserContext } from "../types/UserContextType";

type Post = {
  id: number;
  username: string;
  content: string;
  created_at: string;
  gamename: string;
};

export const BoardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUserName] = useState("");
  const [gamename, setGameName] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      setMessage("データの取得に失敗しました。");
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !gamename || !content) {
      setMessage("投稿に失敗しました");
      setLoading(false);
      setGameName("");
      setUserName("");
      setContent("");
      fetchPosts();
      return;
    }
    const { error } = await supabase
      .from("posts")
      .insert([{ username, content, gamename }]);
    if (error) {
      console.log(error);
      setMessage("投稿に失敗しました");
    } else {
      setGameName("");
      setUserName("");
      setContent("");
      fetchPosts();
      setMessage("投稿しました!");
    }
    setLoading(false);
  };

  return user ? (
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
        <Text>🎮Indieゲームの情報や感想を共有しましょう</Text>

        <Input
          placeholder="名前"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          placeholder="ゲーム名"
          value={gamename}
          onChange={(e) => setGameName(e.target.value)}
        />
        <Textarea
          placeholder="Indiegameの情報を共有しよう!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Text>{message}</Text>

        <Button colorScheme="teal" w="100%" onClick={handleSubmit}>
          投稿
        </Button>
      </VStack>

      <Box maxW="600px" mx="auto" mt={8}>
        <Heading as="h2" size="md" mb={4}>
          最新の投稿
        </Heading>
        <Divider mb={4} />

        {loading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <Text color="gray.500">まだ投稿がありません。</Text>
        ) : (
          posts.map((post) => (
            <Box
              key={post.id}
              bg="white"
              p={4}
              borderRadius="md"
              shadow="sm"
              mb={4}
            >
              <Text fontWeight="bold" color="teal.700" mb={3}>
                {post.username}
              </Text>

              <Text fontWeight="bold" color="green">
                ゲーム名
              </Text>

              <Text fontWeight="bold" color="green">
                {post.gamename}
              </Text>
              <Text mt={2}>{post.content}</Text>
              <Text fontSize="sm" color="green" mt={2}>
                {new Date(post.created_at).toLocaleString("ja-JP")}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  ) : (
    <Box minH="400px">
      <Flex minH="400px" direction="column" justify="center">
        <Text color="gray.500" textAlign="center">
          掲示板を使用するにはログインしてください
        </Text>
      </Flex>
    </Box>
  );
};
