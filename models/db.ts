import Dexie, { Table } from "dexie";
import "fake-indexeddb/auto";

import { populate } from "./populate";

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export interface Integration {
  id?: number;
  user_id: string;
  thirdparty_user_id: string;
  thirdparty_user_password: string;
  enabled: boolean;
}

export interface Monitor {
  id?: number;
  user_id: string;
  parameter_json: string;
  status: string;
}

export class MySubClassedDexie extends Dexie {
  friends!: Table<Friend>;
  integrations!: Table<Integration>;
  monitors!: Table<Monitor>;

  constructor() {
    super("myDatabase");
    this.version(7).stores({
      friends: "++id, name, age",
      integrations:
        "++id, user_id, thirdparty_user_id, thirdparty_user_password, enabled",
      monitors: "++id, user_id, parameter_json, status",
    });
  }
}

export const db = new MySubClassedDexie();

db.on("populate", populate);

export function resetDatabase() {
  return db.transaction(
    "rw",
    db.friends,
    db.integrations,
    db.monitors,
    async () => {
      await Promise.all(db.tables.map((table) => table.clear()));
      await populate();
    }
  );
}
