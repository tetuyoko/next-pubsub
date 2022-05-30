import { db } from "../models/db";
import { useLiveQuery } from "dexie-react-hooks";

export function IntegrationList() {
  const integrations = useLiveQuery(() => db.integrations.toArray());

  return (
    <ul>
      {integrations?.map((i) => (
        <li key={i.id} className={"row " + (i.enabled ? "done" : "")}>
          {i.id}, {i.thirdparty_user_id}, {i.thirdparty_user_password},
          {i.enabled.toString()}
        </li>
      ))}
    </ul>
  );
}
