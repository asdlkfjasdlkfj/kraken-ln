import lunr from "elasticlunr";

import type { Edge, Node } from "./types/LnGraph";

const mkIndex = <X, Y>(f: (x: X) => Y) => (xs: X[]): Map<Y, X> =>
  xs.reduce((index, x) => index.set(f(x), x), new Map<Y, X>());

export const indexNodes = mkIndex((node: Node) => node.pub_key);

export type SearchDocument = {
  channel_id: string;
  last_update: number;
  node1_alias: string;
  node1_pubkey: string;
  node1_color: string;
  node2_alias: string;
  node2_pubkey: string;
  node2_color: string;
};

export const buildSearchIndex = ({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const nodeIndex = indexNodes(nodes);

  const searchIndex = lunr<SearchDocument>(function () {
    this.addField("node1_alias");
    this.addField("node2_alias");
    this.addField("node1_pubkey");
    this.addField("node2_pubkey");
    this.setRef("channel_id");
  });

  for (const edge of edges) {
    const node1 = nodeIndex.get(edge.node1_pub);
    const node2 = nodeIndex.get(edge.node2_pub);

    if (!node1 || !node2) {
      continue;
    }

    searchIndex.addDoc({
      channel_id: edge.channel_id,
      last_update: edge.last_update,
      node1_alias: node1.alias,
      node1_pubkey: node1.pub_key,
      node1_color: node1.color,
      node2_alias: node2.alias,
      node2_pubkey: node2.pub_key,
      node2_color: node2.color,
    });
  }

  return searchIndex;
};

export type { Edge, Node } from "./types/LnGraph";
