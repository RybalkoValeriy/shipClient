import { render, screen } from "@testing-library/react";
import App from "../App";
import { shipReducer, ShipAction } from "../App";
import Ship from "../Models/Ship";

test("The header Ship management is presented", () => {
  // Arrange
  render(<App />);

  // Act
  const h1 = screen.getByText("Ship management");

  // Assert
  expect(h1.textContent).toBe("Ship management");
});

const ship1: Ship = {
  code: "XXXA-1234-A1",
  name: "SomeName1",
  length: 200,
  width: 100,
};

const ship2: Ship = {
  code: "XXXX-1234-X1",
  name: "SomeName2",
  length: 200,
  width: 100,
};

const ships: Ship[] = [ship1, ship2];

test("remove ship from action", () => {
  const action: ShipAction = {
    type: "DELETE_SUCCESS",
    payload: "XXXX-1234-X1",
  };
  const state = {
    data: ships,
    isLoading: false,
    isError: false,
    error: null,
  };

  const newState = shipReducer(state, action);

  const expectedState = {
    data: [ship1],
    isLoading: false,
    isError: false,
    error: "",
  };

  expect(newState).toStrictEqual(expectedState);
});
