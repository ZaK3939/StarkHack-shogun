import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TORII
        ? import.meta.env.VITE_PUBLIC_TORII + "/graphql"
        : "http://0.0.0.0:8080/graphql"
);

type Position = {
    x: number;
    y: number;
};

interface Item {
    id: number;
    itemId: number;
    position: Position;
    rotation: number;
}

type CharacterItemsInventoryCounterQuery = {
    characterItemsInventoryCounterModels: {
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

type CharacterItemInventoryQuery = {
    characterItemInventoryModels: {
        edges: [
            {
                node: {
                    player: string;
                    id: number;
                    itemId: number;
                    position: Position;
                    rotation: number;
                };
            }
        ];
    };
};

export function mapCharacterItemInventoryToItems(
    data: CharacterItemInventoryQuery
): Item[] {
    return data.characterItemInventoryModels.edges.map((edge) => ({
        id: edge.node.id,
        itemId: edge.node.itemId,
        position: edge.node.position,
        rotation: edge.node.rotation,
        player: edge.node.player,
    }));
}

export async function fetchCharacterItemInventory(
    playerAddress: string
): Promise<
    CharacterItemInventoryQuery["characterItemInventoryModels"]["edges"][0]["node"][]
> {
    console.log("Fetching character item inventory for player:", playerAddress);

    // First, fetch the count from CharacterItemsInventoryCounter
    const counterQuery = `
      query CharacterItemsInventoryCounter($player: ContractAddress!) {
        characterItemsInventoryCounterModels(where: { player: $player }) {
          edges {
            node {
              player
              count
            }
          }
        }
      }
    `;

    const counterVariables = {
        player: playerAddress,
    };

    try {
        const counterData: CharacterItemsInventoryCounterQuery =
            await client.request(counterQuery, counterVariables);
        const count =
            counterData.characterItemsInventoryCounterModels.edges[0].node
                .count;

        // Then, fetch the CharacterItemInventory based on the count
        const inventoryQuery = `
        query CharacterItemInventory($player: ContractAddress!, $count: Int!) {
          characterItemInventoryModels(where: { player: $player }, first: $count) {
            edges {
              node {
                player
                id
                itemId
                position {
                  x
                  y
                }
                rotation
              }
            }
          }
        }
      `;

        const inventoryVariables = {
            player: playerAddress,
            count,
        };

        const inventoryData: CharacterItemInventoryQuery = await client.request(
            inventoryQuery,
            inventoryVariables
        );
        return inventoryData.characterItemInventoryModels.edges.map(
            (edge) => edge.node
        );
    } catch (error) {
        console.error("Failed to fetch character item inventory:", error);
        throw error;
    }
}

