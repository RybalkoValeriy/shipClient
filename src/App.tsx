import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import axios from "axios";
import Ship from "./Models/Ship";
import Table from "./components/Table";
import { ShipForm } from "./components/ShipForm";

const apiEndpoint = "http://localhost:5062/api/v1/";

interface ShipState {
  isLoading: boolean;
  data: Ship[];
  isError: boolean;
  error: string | null;
}

type FetchAllShipsInitAction = {
  type: "FETCH_INIT";
};

type FailureShipAction = {
  type: "FAILURE_SHIP";
};

type GetAllShipsAction = {
  type: "GET_ALL";
  payload: Array<Ship>;
};

type CreateShipAction = {
  type: "CREATE_SHIP";
  payload: Ship;
};

type ShipAction =
  | FetchAllShipsInitAction
  | FailureShipAction
  | GetAllShipsAction
  | CreateShipAction;

const shipReducer = (state: ShipState, action: ShipAction): ShipState => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        data: state.data,
        isLoading: true,
        isError: false,
        error: "",
      };
    case "FAILURE_SHIP":
      return {
        data: state.data,
        isLoading: false,
        isError: true,
        error: "",
      };
    case "GET_ALL":
      return {
        data: state.data,
        isError: false,
        isLoading: false,
        error: "",
      };
    case "CREATE_SHIP":
      return {
        data: [action.payload, ...state.data],
        isError: false,
        isLoading: true,
        error: "",
      };
    default:
      throw new Error("error");
  }
};

const App = () => {
  const [ships, dispatchShips] = useReducer(shipReducer, {
    data: [],
    isLoading: false,
    isError: false,
    error: "",
  });

  const getAllShips = useCallback(async () => {
    dispatchShips({ type: "FETCH_INIT" });

    try {
      const shipsResponse = await axios.get<Ship[]>(`${apiEndpoint}ships`);
      dispatchShips({
        type: "GET_ALL",
        payload: shipsResponse.data,
      });
    } catch (error) {
      dispatchShips({
        type: "FAILURE_SHIP",
      });
    }
  }, []);

  useEffect(() => {
    getAllShips();
  }, [getAllShips]);

  const createShipHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
  };

  return (
    <>
      <h1>Ship management</h1>
      <div>
        <ShipForm onSubmitForm={createShipHandler} />
      </div>
      {ships.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {ships.isError && <p>Something went wrong...</p>}
          {<Table data={ships.data} />}
        </div>
      )}
    </>
  );
};

export default App;
