import React from "react";
import { Button } from "react-bootstrap";
import { rowProps } from "./ShipsTable";

const ShipRowTable: React.FC<rowProps> = ({
  item,
  id,
  removeShip,
  selectShipToEdit,
}) => (
  <tr key={id}>
    <td>{id}</td>
    <td>{item.code}</td>
    <td>{item.name}</td>
    <td>{item.length}</td>
    <td>{item.width}</td>
    <td>
      <Button onClick={() => removeShip(item.code)} data-testid="remove">
        Remove
      </Button>
      <Button onClick={() => selectShipToEdit(item)}>Edit</Button>
    </td>
  </tr>
);

export { ShipRowTable };
