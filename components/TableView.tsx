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

export function TableView() {
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
          <Tr>
            <Td>1</Td>
            <Td>Peeabpoo</Td>
            <Td>passsword</Td>
            <Td>NotYet</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
