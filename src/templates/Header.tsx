// src/components/Header.tsx
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginPage } from "../Pages/LoginPage";

export const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // スクロールでヘッダーを隠す処理
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; //スクロールしたら数値増える
      if (currentScrollY <= 0) {
        setShow(true);
      } else if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     setUser(session?.user ?? null);
  //   };
  //   getUser();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // const handleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  //   if (error) console.error("Login Error", error);
  // };

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) console.log("Logout Error", error);
  // };

  return (
    <Box
      bg="teal.600"
      color="white"
      py={3}
      px={6}
      boxShadow="md"
      position="fixed"
      top={show ? 0 : "-80px"}
      left={0}
      right={0}
      zIndex={1000}
      transition="top 0.5s ease"
    >
      <Flex justify="space-between" align="center">

        <Heading as="h1" size={{ base: "md", md: "xl" }}>
          <Link to="/">IndieGameSite</Link>
        </Heading>

        {/* PC用メニュー */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          <Link to="/">
            <Button colorScheme="white">ホーム</Button>
          </Link>
          <Link to="/about">
            <Button colorScheme="white">サイトについて</Button>
          </Link>
          <Link to="/LoginPage">
            <Button colorScheme="white">ログイン</Button>
          </Link>
        </Flex>

        {/* スマホ用ハンバーガー */}
        <IconButton
          color="white"
          bg="transparent"
          aria-label="ナビゲーションメニュー"
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
        />

        {/* Drawer (スマホメニュー) */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Flex direction="column" gap={2} mt={4}>
                <Link to="/" onClick={onClose}>
                  <Button colorScheme="teal">ホーム</Button>
                </Link>
                <Link to="/about" onClick={onClose}>
                  <Button colorScheme="teal">サイトについて</Button>
                </Link>
                <Link to="/LoginPage">
                  <Button colorScheme="teal">ログイン</Button>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

{
  /* <div>
            {user ? (
              <>
                <Button
                  _hover={{ bg: "teal.700" }}
                  colorScheme="teal.400"
                  onClick={async () => await supabase.auth.signOut()}
                >
                  ログイン中
                </Button>
              </>
            ) : (
              <Button
                _hover={{ bg: "teal.700" }}
                colorScheme="white"
                onClick={async () => {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: "google",
                  });
                  if (error) console.error("Login Error", error);
                }}
              >
                ログイン
              </Button>
            )}
          </div> */
}
