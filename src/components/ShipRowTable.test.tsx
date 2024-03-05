import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Ship from "../Models/Ship";
import { ShipRowTable } from "./ShipRowTable";

const ship1: Ship = {
  code: "XXXA-1234-A1",
  name: "SomeName1",
  length: 200,
  width: 100,
};

const id: number = 1;

describe("ShipItems", () => {
  it("renders all properties", () => {
    // render element
    render(
      <ShipRowTable
        item={ship1}
        id={id}
        removeShip={() => {}}
        selectShipToEdit={() => {}}
      />
    );

    // to see rendered element in test-console
    screen.debug();

    expect(screen.getByText("XXXA-1234-A1")).toBeInTheDocument();
    expect(screen.getByText("SomeName1")).toBeInTheDocument();
    // screen.getByRole("button")
    // screen.getByText("someText")
    // widely use functions
  });

  it("clicking the remove button calls handler", () => {
    const handlerRemoveShip = vi.fn();

    render(
      <ShipRowTable
        item={ship1}
        id={id}
        removeShip={handlerRemoveShip}
        selectShipToEdit={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId("remove")); // to set in html: data-testid="remove"

    expect(handlerRemoveShip).toHaveBeenCalledTimes(1);
  });
});
