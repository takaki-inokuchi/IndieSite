import React, { useEffect, useState } from "react";
import type { IndieGame } from "../types/types";
import { GameCard } from "../components/Ranking";
import {
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// タブタイプ
type Tab = "new" | "popular";

// JSON に既に順番があるのでランク付けは不要
type RankedIndieGame = IndieGame & { rank: number };

export const Home: React.FC = () => {
  const [tab, setTab] = useState<Tab>("new");

  // 新作順と人気順を別々に保持
  const [newGames, setNewGames] = useState<RankedIndieGame[]>([]);
  const [popularGames, setPopularGames] = useState<RankedIndieGame[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<RankedIndieGame[]>>
    ) => {
      try {
        const data: IndieGame[] = await (await fetch(url, { signal })).json();
        const rankedData: RankedIndieGame[] = data.map((game, i) => ({
          ...game,
          rank: i + 1,
        }));
        setter(rankedData);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    fetchData("/indieRanking_new.json", setNewGames);
    fetchData("/indieRanking_popular.json", setPopularGames);

    return () => controller.abort();
  }, []);

  const currentLabel = tab === "new" ? "新作順" : "人気順";

  return (
    <Container maxW="6xl" py={8}>
      {tab === "new" && (
        <Heading size="xl" mb={6} color="teal.600">
          新着順
        </Heading>
      )}

      {tab === "popular" && (
        <Heading size="xl" mb={6} color="teal.600">
          Indieゲームランキング
        </Heading>
      )}

      {/* タブ切り替え */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {currentLabel}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setTab("new")} isDisabled={tab === "new"}>
            新作順
          </MenuItem>
          <MenuItem
            onClick={() => setTab("popular")}
            isDisabled={tab === "popular"}
          >
            人気順
          </MenuItem>
        </MenuList>
      </Menu>

      {/* 新作順 */}
      {tab === "new" && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="100%">
          {newGames.map((game) => (
            <GameCard key={game.appid} game={game} rank={game.rank} />
          ))}
        </SimpleGrid>
      )}

      {/* 人気順 */}
      {tab === "popular" && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="100%">
          {popularGames.map((game) => (
            <GameCard key={game.appid} game={game} rank={game.rank} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};
