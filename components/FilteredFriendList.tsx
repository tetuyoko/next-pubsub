import { db } from "../models/db";
import { useLiveQuery } from "dexie-react-hooks";

interface Props {
  minAge: number;
  maxAge: number;
}

export function FilteredFriendList({ minAge, maxAge }: Props) {
  const friends = useLiveQuery(async () => {
    const friends = await db.friends
      .where("age")
      .between(minAge, maxAge)
      .toArray();
    return friends;
  }, [minAge, maxAge]);

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
