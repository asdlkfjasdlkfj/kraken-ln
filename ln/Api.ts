import type { Edge, Node } from "./types/LnGraph";

export type GraphResourceResponse = {
  edges: Edge[];
  nodes: Node[];
};

export type GraphResouce = () => Promise<GraphResourceResponse>;
