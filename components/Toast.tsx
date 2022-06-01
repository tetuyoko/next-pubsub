import { Button, useToast } from "@chakra-ui/react";
import sleepSec from "../lib/sleepSec";
import randNumber from "../lib/randNumber";

const id = "test-toast";

export function Toast() {
  const toast = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          title: "Integration creating.",
          status: "loading",
          duration: randNumber(1, 7) * 1000,
          position: "top",
          onCloseComplete: () => {
            toast({
              title: "Account created.",
              status: "success",
              duration: 3000,
              position: "top",
            });
          },
        });
      }}
    >
      Show Toast
    </Button>
  );
}
