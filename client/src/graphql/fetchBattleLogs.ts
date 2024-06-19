import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://0.0.0.0:8080/graphql");

type BattleLogsQuery = {
    battleLogModels: {
        edges: [
            {
                node: {
                    id: number;
                    player: string;
                    dummyCharLevel: number;
                    dummyCharId: number;
                    winner: string;
                };
            }
        ];
    };
};

export async function fetchBattleLogs(
    playerAddress: string,
    first: number,
    skip: number
): Promise<BattleLogsQuery["battleLogModels"]["edges"]> {
    const query = `
    query BattleLogs($player: ContractAddress!, $first: Int!) {
      battleLogModels(where: { player: $player }, first: $first, order: { direction: DESC, field: ID }) {
        edges {
          node {
            id
            player
            dummyCharLevel
            dummyCharId
            winner
          }
        }
      }
    }
  `;

    const variables = {
        player: playerAddress,
        first,
        skip,
    };

    try {
        const data: BattleLogsQuery = await client.request(query, variables);
        return data.battleLogModels.edges;
    } catch (error) {
        console.error("Failed to fetch battle logs:", error);
        throw error;
    }
}

