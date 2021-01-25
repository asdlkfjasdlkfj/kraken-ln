import Head from "next/head";
import { GraphResourceContext, httpResource } from "../context/GraphResource";

import { EdgeExplorer, Navigation, Logo } from "../components";

export default function Home() {
  return (
    <GraphResourceContext.Provider value={httpResource}>
      <Head>
        <title>LN Graph Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation>
        <Logo />
      </Navigation>
      <EdgeExplorer />
    </GraphResourceContext.Provider>
  );
}
