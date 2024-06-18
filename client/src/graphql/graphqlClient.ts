import { GraphQLClient } from "graphql-request";

const endpoint = "http://0.0.0.0:8080/graphql"; // GraphQL エンドポイントを指定

export const graphqlClient = new GraphQLClient(endpoint);
