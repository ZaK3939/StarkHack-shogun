import { GraphQLClient } from "graphql-request";

// const endpoint = "http://0.0.0.0:8080/graphql";

const endpoint = import.meta.env.VITE_PUBLIC_TORII
    ? import.meta.env.VITE_PUBLIC_TORII + "/graphql"
    : "http://0.0.0.0:8080/graphql";

export const graphqlClient = new GraphQLClient(endpoint);

