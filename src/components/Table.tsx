import React from "react";
import Ship from "../Models/Ship";

type tableProps = {
  data: Ship[];
};

type rowProps = {
  item: Ship;
};

const Table: React.FC<tableProps> = ({ data }) => {
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
        <tbody>{data.map((ship) => Row({ item: ship }))}</tbody>
      </table>
    </div>
  );
};

const Row: React.FC<rowProps> = ({ item }) => {
  return (
    <tr>
      <td>{item.code}</td>
      <td>{item.name}</td>
      <td>{item.length}</td>
      <td>{item.width}</td>
    </tr>
  );
};

export default Table;
