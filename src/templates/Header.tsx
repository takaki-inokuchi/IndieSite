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
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import { Logout } from "../Auth/signInWithProvider";

export const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

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

        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          <Link to="/">
            <Button colorScheme="white">ホーム</Button>
          </Link>

          {user ? (
            <Button colorScheme="white" onClick={Logout}>
              ログアウト
            </Button>
          ) : (
            <Link to="/LoginPage">
              <Button colorScheme="white">ログイン</Button>
            </Link>
          )}

          <Link to="/BoardPage">
            <Button colorScheme="white">掲示板</Button>
          </Link>
        </Flex>

        <IconButton
          color="white"
          bg="transparent"
          aria-label="ナビゲーションメニュー"
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
        />

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Flex direction="column" gap={2} mt={4}>
                <Link to="/" onClick={onClose}>
                  <Button colorScheme="teal">ホーム</Button>
                </Link>

                {user ? (
                  <Button colorScheme="white" onClick={Logout}>
                    ログアウト
                  </Button>
                ) : (
                  <Link to="/LoginPage">
                    <Button colorScheme="white">ログイン</Button>
                  </Link>
                )}

                <Link to="/BoardPage" onClick={onClose}>
                  <Button colorScheme="teal">掲示板</Button>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
