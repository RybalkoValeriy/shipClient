import React from "react";
import Ship from "../Models/Ship";

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

const Table: React.FC<tableProps> = ({
  data,
  removeShip,
  selectShipToEdit,
}) => {
  return (
    <div>
      <h2>Ships</h2>
      <table>
        <thead>
          <tr>
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
      </table>
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
      <td>{item.code}</td>
      <td>{item.name}</td>
      <td>{item.length}</td>
      <td>{item.width}</td>
      <td>
        <button onClick={() => removeShip(item.code)}>Remove</button>
        <button onClick={() => selectShipToEdit(item)}>Edit</button>
      </td>
    </tr>
  );
};

export default Table;
