import { object, func, string } from "@dagger.io/dagger";

@object()
export class ApolloSubgraphPublisher {
  @func()
  async publish(
    @string apolloKey: string,
    @string graphRef: string,
    @string subgraphName: string,
    @string schemaPath: string,
    @string routingUrl: string
  ): Promise<string> {
    return dag
      .container()
      .from("node:20")
      .withExec(["npm", "install", "-g", "@apollo/rover"])
      .withEnvVariable("APOLLO_KEY", apolloKey)
      .withMountedDirectory("/app", dag.host().directory("."))
      .withWorkdir("/app")
      .withExec([
        "rover",
        "subgraph",
        "publish",
        graphRef,
        "--schema",
        schemaPath,
        "--name",
        subgraphName,
        "--routing-url",
        routingUrl,
      ])
      .stdout();
  }
}
