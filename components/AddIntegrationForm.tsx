import { useState } from "react";
import UUID from "uuidjs";

import { db } from "../models/db";

export function AddIntegrationForm() {
  const [thirdparty_user_id, setThirdpartyUserId] = useState("");
  const [thirdparty_user_password, setThirdpartyUserPassword] = useState("");
  const [status, setStatus] = useState("");

  async function addIntegration() {
    const uuid = UUID.genV4().hexNoDelim;

    try {
      const id = await db.integrations.add({
        thirdparty_user_id,
        thirdparty_user_password,
        user_id: uuid,
        enabled: false,
      });

      setStatus(
        `Integration ${thirdparty_user_id} successfully added. Got id ${id}`
      );
      setThirdpartyUserId("");
      setThirdpartyUserPassword("");
    } catch (error) {
      setStatus(`Failed to add ${thirdparty_user_id}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      3rdPartyUserId:
      <input
        type="text"
        value={thirdparty_user_id}
        onChange={(ev) => setThirdpartyUserId(ev.target.value)}
      />
      3rdPartyUserPassword:
      <input
        type="text"
        value={thirdparty_user_password}
        onChange={(ev) => setThirdpartyUserPassword(ev.target.value)}
      />
      <button onClick={addIntegration}>Add</button>
    </>
  );
}
