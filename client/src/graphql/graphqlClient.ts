import { GraphQLClient } from "graphql-request";

// const endpoint = "http://0.0.0.0:8080/graphql";

const endpoint = import.meta.env.VITE_PUBLIC_TEST
    ? "http://0.0.0.0:8080/graphql"
    : import.meta.env.VITE_PUBLIC_TORII + "/graphql";

export const graphqlClient = new GraphQLClient(endpoint);

