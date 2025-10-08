import React, { useEffect, useState } from "react";
import type { IndieGame } from "../types/types";
import { GameCard } from "../components/GameCard";
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

type Tab = "new" | "popular";

type RankedIndieGame = IndieGame & { rank: number };

export const Home: React.FC = () => {
  const [tab, setTab] = useState<Tab>("new");

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
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.log(err);
        }
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
          {newGames.map((game, index) => (
            <GameCard
              key={`${game.appid}-${index}`}
              game={game}
              rank={game.rank}
            />
          ))}
        </SimpleGrid>
      )}

      {/* 人気順 */}
      {tab === "popular" && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="100%">
          {popularGames.map((game, index) => (
            <GameCard
              key={`${game.appid}-${index}`}
              game={game}
              rank={game.rank}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};