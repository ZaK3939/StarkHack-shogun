import { Account } from "starknet";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
    import.meta.env.VITE_PUBLIC_TORII
        ? import.meta.env.VITE_PUBLIC_TORII + "/graphql"
        : "http://0.0.0.0:8080/graphql"
);

export interface ShopItemData {
    player: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    item6: string;
}

export async function fetchItemShop(
    account: Account
): Promise<ShopItemData | null> {
    try {
        const query = `
      query GetShop($player: ContractAddress!) {
        shopModels(where: { playerEQ: $player }) {
          edges {
            node {
              player
              item1
              item2
              item3
              item4
              item5
              item6
            }
          }
        }
      }
    `;

        const variables = {
            player: account.address,
        };

        const data = await client.request<{
            shopModels: { edges: [{ node: ShopItemData }] };
        }>(query, variables);

        if (data?.shopModels?.edges?.[0]?.node) {
            return data.shopModels.edges[0].node;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching shop data:", error);
        return null;
    }
}
