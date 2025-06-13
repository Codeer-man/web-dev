import { Pool, PoolClient } from "pg";

declare global {
  var pg: {
    conn: Pool | null;
    promise: Promise<Pool> | null;
  };
}

export {};
