import React from "react";
import Ship from "../Models/Ship";
import { Button, Table } from "react-bootstrap";

type tableProps = {
  data: Ship[];
  removeShip: (code: string) => void;
  selectShipToEdit: (ship: Ship) => void;
};

type rowProps = {
  item: Ship;
  id: number;
  removeShip: (code: string) => void;
  selectShipToEdit: (ship: Ship) => void;
};

const ShipsTable: React.FC<tableProps> = ({
  data,
  removeShip,
  selectShipToEdit,
}) => {
  return (
    <div>
      <h2>Ships</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>code</th>
            <th>name</th>
            <th>length</th>
            <th>width</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ship, id) =>
            Row({ item: ship, id: id, removeShip, selectShipToEdit })
          )}
        </tbody>
      </Table>
    </div>
  );
};

const Row: React.FC<rowProps> = ({
  item,
  id,
  removeShip,
  selectShipToEdit,
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{item.code}</td>
      <td>{item.name}</td>
      <td>{item.length}</td>
      <td>{item.width}</td>
      <td>
        <Button onClick={() => removeShip(item.code)}>Remove</Button>
        <Button onClick={() => selectShipToEdit(item)}>Edit</Button>
      </td>
    </tr>
  );
};

export default ShipsTable;
