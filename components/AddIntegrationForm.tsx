import { useState } from "react";
import { db } from "../models/db";

interface Props {
  defaultAge: number;
}

export function AddIntegrationForm({ defaultAge }: Props = { defaultAge: 21 }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState("");

  async function addIntegration() {
    try {
      const id = await db.friends.add({
        name,
        age,
      });

      setStatus(`Integration ${name} successfully added. Got id ${id}`);
      setName("");
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={(ev) => setAge(Number(ev.target.value))}
      />
      <button onClick={addIntegration}>Add</button>
    </>
  );
}
