import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TEST
        ? "http://0.0.0.0:8080/graphql"
        : import.meta.env.VITE_PUBLIC_TORII + "/graphql"
);

type CharacterItemsStorageCounterQuery = {
    characterItemsStorageCounterModels: {
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

type CharacterItemStorageQuery = {
    characterItemStorageModels: {
        edges: [
            {
                node: {
                    player: string;
                    id: number;
                    itemId: number;
                };
            }
        ];
    };
};

export async function fetchCharacterItemStorage(
    playerAddress: string
): Promise<
    CharacterItemStorageQuery["characterItemStorageModels"]["edges"][0]["node"][]
> {
    console.log("Fetching character item storage for player:", playerAddress);

    // First, fetch the count from CharacterItemsStorageCounter
    const counterQuery = `
    query CharacterItemsStorageCounter($player: ContractAddress!) {
      characterItemsStorageCounterModels(where: { player: $player }) {
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
        const counterData: CharacterItemsStorageCounterQuery =
            await client.request(counterQuery, counterVariables);
        const count =
            counterData.characterItemsStorageCounterModels.edges[0].node.count;

        // Then, fetch the CharacterItemStorage based on the count
        const storageQuery = `
      query CharacterItemStorage($player: ContractAddress!, $count: Int!) {
        characterItemStorageModels(where: { player: $player }, first: $count) {
          edges {
            node {
              player
              id
              itemId
            }
          }
        }
      }
    `;

        const storageVariables = {
            player: playerAddress,
            count,
        };

        const storageData: CharacterItemStorageQuery = await client.request(
            storageQuery,
            storageVariables
        );
        return storageData.characterItemStorageModels.edges.map(
            (edge) => edge.node
        );
    } catch (error) {
        console.error("Failed to fetch character item storage:", error);
        throw error;
    }
}

