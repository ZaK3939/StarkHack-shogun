import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TEST
        ? "http://0.0.0.0:8080/graphql"
        : import.meta.env.VITE_PUBLIC_TORII + "/graphql"
);

type BattleLogDetailQuery = {
    battleLogDetailModels: {
        edges: [
            {
                node: {
                    id: number;
                    player: string;
                    battleLogId: number;
                    whoTriggered: string;
                    whichItem: number;
                    damageCaused: number;
                    isDodged: boolean;
                    buffType: string;
                    regenHP: number;
                    player_armor_stacks: number;
                    player_regen_stacks: number;
                    player_reflect_stacks: number;
                    player_spike_stacks: number;
                    dummy_armor_stacks: number;
                    dummy_regen_stacks: number;
                    dummy_reflect_stacks: number;
                    dummy_spike_stacks: number;
                };
            }
        ];
    };
};

export async function fetchBattleLogDetail(
    playerAddress: string,
    battleLogId: number
): Promise<BattleLogDetailQuery["battleLogDetailModels"]["edges"]> {
    const query = `
    query BattleLogDetail($player: ContractAddress!, $battleLogId: Int!) {
      battleLogDetailModels(where: { player: $player, battleLogId: $battleLogId }, order: { direction: ASC, field: ID }) {
        edges {
          node {
            id
            player
            battleLogId
            whoTriggered
            whichItem
            damageCaused
            isDodged
            buffType
            regenHP
            player_armor_stacks
            player_regen_stacks
            player_reflect_stacks
            player_spike_stacks
            dummy_armor_stacks
            dummy_regen_stacks
            dummy_reflect_stacks
            dummy_spike_stacks
          }
        }
      }
    }
  `;

    const variables = {
        player: playerAddress,
        battleLogId,
    };

    try {
        const data: BattleLogDetailQuery = await client.request(
            query,
            variables
        );
        console.log(data);
        return data.battleLogDetailModels.edges;
    } catch (error) {
        console.error("Failed to fetch battle log detail:", error);
        throw error;
    }
}

