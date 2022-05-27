import { db } from "./db";

export async function populate() {
  await db.integrations.add({
    user_id: "1_fasdfa3",
    thirdparty_user_id: "tfga09fua",
    thirdparty_user_password: "1fasdfa3",
    enabled: false,
  });
  await db.integrations.add({
    user_id: "2_fasdfa3",
    thirdparty_user_id: "2_tfga09fua",
    thirdparty_user_password: "2_1fasdfa3",
    enabled: false,
  });
}
