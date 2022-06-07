import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { db } from "../models/db";
import { useLiveQuery } from "dexie-react-hooks";

export function TableView() {
  const integrations = useLiveQuery(() => db.integrations.reverse().toArray());
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Debug views of Integratios table</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>ThirdpartyUserId</Th>
            <Th>ThirdpartyUserPassword</Th>
            <Th>Enabled</Th>
          </Tr>
        </Thead>
        <Tbody>
          {integrations?.map((i) => (
            <Tr key={i.id} className={"row " + (i.enabled ? "done" : "")}>
              <Td>{i.id}</Td>
              <Td>{i.thirdparty_user_id}</Td>
              <Td>{i.thirdparty_user_password}</Td>
              <Td>{i.enabled.toString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
