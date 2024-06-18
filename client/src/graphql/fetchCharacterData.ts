import { Account } from "starknet";
import { graphqlClient } from "./graphqlClient";

interface CharacterData {
    characterModels: {
        edges: {
            node: {
                player: string;
                name: string;
                gold: number;
                health: number;
                wins: number;
                loss: number;
                dummied: boolean;
                rating: number;
                totalWins: number;
                totalLoss: number;
                winStreak: number;
                birthCount: number;
                updatedAt: string;
            };
        }[];
    };
}

export async function fetchCharacterData(account: Account) {
    try {
        const query = `
      query GetCharacter($player: ContractAddress!) {
        characterModels(where: { playerEQ: $player }, limit: 1) {
          edges {
            node {
              gold
              health
              totalWins
            }
          }
        }
      }
    `;

        const variables = {
            player: account.address,
        };

        const data = await graphqlClient.request<CharacterData>(
            query,
            variables
        );

        if (data?.characterModels?.edges?.[0]?.node) {
            const character = data.characterModels.edges[0].node;
            return {
                gold: character.gold,
                vitality: character.health,
                victories: character.totalWins,
            };
        }
    } catch (error) {
        console.error("Error fetching character data:", error);
        return null;
    }
}

