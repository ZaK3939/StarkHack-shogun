import { Account } from "starknet";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TORII
        ? import.meta.env.VITE_PUBLIC_TORII + "/graphql"
        : "http://0.0.0.0:8080/graphql"
);

export interface CharacterData {
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
}

export async function fetchCharacterData(
    account: Account
): Promise<CharacterData | null> {
    try {
        const query = `
      query GetCharacter($player: ContractAddress!) {
        characterModels(where: { playerEQ: $player }, limit: 1) {
          edges {
            node {
              player
              name
              gold
              health
              wins
              loss
              dummied
              rating
              totalWins
              totalLoss
              winStreak
              birthCount
              updatedAt
            }
          }
        }
      }
    `;

        const variables = {
            player: account.address,
        };

        const data = await client.request<{
            characterModels: { edges: [{ node: CharacterData }] };
        }>(query, variables);

        if (data?.characterModels?.edges?.[0]?.node) {
            return data.characterModels.edges[0].node;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching character data:", error);
        return null;
    }
}

