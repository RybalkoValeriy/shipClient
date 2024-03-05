import React from "react";
import Ship from "../Models/Ship";
import { Table } from "react-bootstrap";
import { ShipRowTable } from "./ShipRowTable";

type tableProps = {
  data: Ship[];
  removeShip: (code: string) => void;
  selectShipToEdit: (ship: Ship) => void;
};

export type rowProps = {
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
            ShipRowTable({ item: ship, id: id, removeShip, selectShipToEdit })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ShipsTable;
