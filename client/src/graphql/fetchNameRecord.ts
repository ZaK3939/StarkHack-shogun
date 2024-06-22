import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TORII
        ? import.meta.env.VITE_PUBLIC_TORII + "/graphql"
        : "http://0.0.0.0:8080/graphql"
);

type NameRecord = {
    name: string;
    player: string;
};

type NameRecordQuery = {
    nameRecordModels: {
        edges: [
            {
                node: NameRecord;
            }
        ];
    };
};

export async function fetchNameRecord(
    name: string,
    player: string
): Promise<NameRecord | null> {
    const query = `
      query NameRecord($name: felt252!, $player: ContractAddress!) {
        nameRecordModels(where: { name: $name, player: $player }) {
          edges {
            node {
              name
              player
            }
          }
        }
      }
    `;

    const variables = {
        name: name,
        player: player,
    };

    try {
        const data: NameRecordQuery = await client.request(query, variables);
        if (data.nameRecordModels.edges.length > 0) {
            return data.nameRecordModels.edges[0].node;
        }
        return null;
    } catch (error) {
        console.error("Error fetching NameRecord:", error);
        throw error;
    }
}

