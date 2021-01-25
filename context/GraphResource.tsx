import React from "react";

import type { GraphResouce } from "../ln/Api";

export const GraphResourceContext = React.createContext<GraphResouce>(() =>
  Promise.resolve({ edges: [], nodes: [] })
);

let httpCache: GraphResouce | undefined;
export const httpResource: GraphResouce = () =>
  httpCache
    ? Promise.resolve(httpCache)
    : fetch("/lightning_graph.json").then((data) => data.json());

export type { GraphResourceResponse, GraphResouce } from "../ln/Api";
