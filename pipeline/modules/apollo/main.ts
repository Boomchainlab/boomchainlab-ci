import { ApolloSubgraphPublisher } from "./modules/apollo/publish.ts";

const publisher = new ApolloSubgraphPublisher();

const apolloKey = await dag
  .secret("apollo_key") // set via `dagger project secrets set apollo_key`
  .plaintext();

await publisher.publish(
  apolloKey,
  "Chonk9k-supbgraph@current",
  "products", // Replace with actual subgraph name if different
  "./products-schema.graphql",
  "http://products.prod.svc.cluster.local:4001/graphql"
);
