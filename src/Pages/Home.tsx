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

type Tab = "new" | "popular";

// JSON に既に順番があるのでランク付けは不要
type RankedIndieGame = IndieGame & { rank: number };

export const Home: React.FC = () => {
  const [tab, setTab] = useState<Tab>("new");
  const [games, setGames] = useState<RankedIndieGame[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const url =
          tab === "new"
            ? "/indieRanking_new.json"
            : "/indieRanking_popular.json";
        const data: IndieGame[] = await (await fetch(url, { signal })).json();

        // JSON の順番通りにランク付け
        const rankedData: RankedIndieGame[] = data.map((game, i) => ({
          ...game,
          rank: i + 1,
        }));

        setGames(rankedData);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch canceled");
        } else {
          console.error(err);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [tab]);

  const currentLabel = tab === "new" ? "新作順" : "人気順";

  return (
    <Container maxW="6xl" py={8}>
      <Heading size="xl" mb={6} color="teal.600">
        Indieゲームランキング
      </Heading>

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

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="100%">
        {games.map((game) => (
          <GameCard key={game.appid} game={game} rank={game.rank} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
