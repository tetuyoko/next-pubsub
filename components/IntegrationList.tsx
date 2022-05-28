import { db } from "../models/db";
import { useLiveQuery } from "dexie-react-hooks";

export function IntegrationList() {
  const friends = useLiveQuery(() => db.friends.toArray());

  return (
    <ul>
      {friends?.map((friend) => (
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>
      ))}
    </ul>
  );
}
