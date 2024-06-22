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

type DummyCharacterItemsCounterQuery = {
    dummyCharacterItemsCounterModels: {
        edges: [
            {
                node: {
                    level: number;
                    dummyCharId: number;
                    count: number;
                };
            }
        ];
    };
};

type DummyCharacterItemQuery = {
    dummyCharacterItemModels: {
        edges: [
            {
                node: {
                    level: number;
                    dummyCharId: number;
                    counterId: number;
                    itemId: number;
                    position: Position;
                    rotation: number;
                };
            }
        ];
    };
};

export async function fetchDummyCharacterItems(
    level: number,
    dummyCharId: number
): Promise<
    DummyCharacterItemQuery["dummyCharacterItemModels"]["edges"][0]["node"][]
> {
    console.log(
        "Fetching dummy character items for level:",
        level,
        "and dummyCharId:",
        dummyCharId
    );

    // First, fetch the count from DummyCharacterItemsCounter
    const counterQuery = `
    query DummyCharacterItemsCounter($level: Int!, $dummyCharId: Int!) {
      dummyCharacterItemsCounterModels(where: { level: $level, dummyCharId: $dummyCharId }) {
        edges {
          node {
            level
            dummyCharId
            count
          }
        }
      }
    }
  `;
    const counterVariables = {
        level,
        dummyCharId,
    };

    try {
        const counterData: DummyCharacterItemsCounterQuery =
            await client.request(counterQuery, counterVariables);
        const count =
            counterData.dummyCharacterItemsCounterModels.edges[0].node.count;

        // Then, fetch the DummyCharacterItems based on the count
        const itemsQuery = `
      query DummyCharacterItems($level: Int!, $dummyCharId: Int!, $count: Int!) {
        dummyCharacterItemModels(
          where: { level: $level, dummyCharId: $dummyCharId },
          first: $count
        ) {
          edges {
            node {
              level
              dummyCharId
              counterId
              itemId
              position
              rotation
            }
          }
        }
      }
    `;
        const itemsVariables = {
            level,
            dummyCharId,
            count,
        };

        const itemsData: DummyCharacterItemQuery = await client.request(
            itemsQuery,
            itemsVariables
        );
        return itemsData.dummyCharacterItemModels.edges.map(
            (edge) => edge.node
        );
    } catch (error) {
        console.error("Failed to fetch dummy character items:", error);
        throw error;
    }
}
