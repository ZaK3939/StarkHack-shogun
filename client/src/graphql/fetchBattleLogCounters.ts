import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://0.0.0.0:8080/graphql");

type BattleLogCountersQuery = {
    battleLogCounterModels: {
        edges: [
            {
                node: {
                    player: string;
                    count: number;
                };
            }
        ];
    };
};

export async function fetchBattleLogCounters(
    playerAddress: string
): Promise<number> {
    const query = `
    query BattleLogCounters($player: ContractAddress!) {
      battleLogCounterModels(where: { player: $player }, first: 1) {
        edges {
          node {
            player
            count
          }
        }
      }
    }
  `;

    const variables = {
        player: playerAddress,
    };

    try {
        const data: BattleLogCountersQuery = await client.request(
            query,
            variables
        );
        if (data.battleLogCounterModels.edges.length > 0) {
            return data.battleLogCounterModels.edges[0].node.count;
        }
        return 0;
    } catch (error) {
        console.error("Failed to fetch battle log counters:", error);
        throw error;
    }
}

