import * as React from "react";
import { db, resetDatabase } from "../models/db";
import { Button } from "@chakra-ui/react";
export function ResetDatabaseButton() {
  return (
    <Button
      bg={"pink.400"}
      color={"white"}
      _hover={{
        bg: "pink.500",
      }}
      className="large-button"
      onClick={() => {
        resetDatabase();
      }}
    >
      Reset Database
    </Button>
  );
}
