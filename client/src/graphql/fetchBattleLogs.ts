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
    id: number
): Promise<BattleLogsQuery["battleLogModels"]["edges"][0]["node"]> {
    const query = `
    query BattleLog($player: ContractAddress!, $id: u32!) {
      battleLogModels(where: { player: $player, id: $id }) {
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
        id,
    };

    try {
        const data: BattleLogsQuery = await client.request(query, variables);
        return data.battleLogModels.edges[0].node;
    } catch (error) {
        console.error("Failed to fetch battle log:", error);
        throw error;
    }
}
