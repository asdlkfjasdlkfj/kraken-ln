export type NodePolicy = {
  disabled: boolean;
  fee_base_msat: string;
  fee_rate_milli_msat: string;
  last_update: number;
  max_htlc_msat: string;
  min_htlc: string;
  time_lock_delta: number;
};

export type Edge = {
  capacity: string;
  chan_point: string;
  channel_id: string;
  last_update: number;
  node1_policy: NodePolicy | null;
  node1_pub: string;
  node2_policy: NodePolicy | null;
  node2_pub: string;
};

export type NodeAddress = {
  addr: string;
  network: string;
};

type NodeFeature<T extends string> = {
  name: T;
  is_required: boolean;
  is_known: true;
};

export type Node = {
  addresses: NodeAddress[];
  alias: string;
  color: string;
  features: {
    0?: NodeFeature<"data-loss-protect">;
    5?: NodeFeature<"upfront-shutdown-script">;
    7?: NodeFeature<"gossip-queries">;
    9?: NodeFeature<"tlv-onion">;
    13?: NodeFeature<"static-remote-key">;
    15?: NodeFeature<"payment-addr">;
    17?: NodeFeature<"multi-path-payments">;
  };
  last_update: number;
  pub_key: string;
};
