import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import axios from "axios";
import Ship from "./Models/Ship";
import ShipsTable from "./components/ShipsTable";
import ShipForm from "./components/ShipForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

const apiEndpoint = "http://localhost:5062/api/v1/";

export interface ShipState {
  isLoading: boolean;
  data: Ship[];
  isError: boolean;
  error: string | null;
}

type FetchAllShipsInitAction = {
  type: "FETCH_INIT";
};

type FailureShipAction = {
  type: "FAILURE";
};

type GetAllShipsAction = {
  type: "FETCH_SUCCESS";
  payload: Array<Ship>;
};

type CreateShipAction = {
  type: "CREATE_SUCCESS";
  payload: Ship;
};

type DeleteShipAction = {
  type: "DELETE_SUCCESS";
  payload: string;
};

type UpdateShipAction = {
  type: "UPDATE_SUCCESS";
  payload: Ship;
};

export type ShipAction =
  | FetchAllShipsInitAction
  | FailureShipAction
  | GetAllShipsAction
  | CreateShipAction
  | DeleteShipAction
  | UpdateShipAction;

export const shipReducer = (
  state: ShipState,
  action: ShipAction
): ShipState => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        data: state.data,
        isLoading: true,
        isError: false,
        error: "",
      };
    case "FAILURE":
      return {
        data: state.data,
        isLoading: false,
        isError: true,
        error: "",
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        isLoading: false,
        isError: false,
        error: "",
      };
    case "CREATE_SUCCESS":
      return {
        data: [action.payload, ...state.data],
        isLoading: false,
        isError: false,
        error: "",
      };
    case "DELETE_SUCCESS":
      return {
        data: state.data.filter((ship) => ship.code !== action.payload),
        isLoading: false,
        isError: false,
        error: "",
      };
    case "UPDATE_SUCCESS":
      return {
        data: state.data.map((ship) =>
          ship.code === action.payload.code
            ? {
                ...ship,
                name: action.payload.name,
                length: action.payload.length,
                width: action.payload.width,
              }
            : ship
        ),
        isLoading: false,
        isError: false,
        error: "",
      };
    default:
      throw new Error("error");
  }
};

type AppFormProps = {
  ship?: Ship;
};

const App: React.FC<AppFormProps> = () => {
  const [ships, dispatchShips] = useReducer(shipReducer, {
    data: [],
    isLoading: false,
    isError: false,
    error: "",
  });

  const [shipToEdit, setShipToEdit] = useState<Ship | undefined>();

  const getAllShips = useCallback(async () => {
    dispatchShips({ type: "FETCH_INIT" });

    try {
      const shipsResponse = await axios.get<Array<Ship>>(`${apiEndpoint}ships`);
      dispatchShips({
        type: "FETCH_SUCCESS",
        payload: shipsResponse.data,
      });
    } catch (error) {
      dispatchShips({
        type: "FAILURE",
      });
    }
  }, []);

  useEffect(() => {
    getAllShips();
  }, [getAllShips]);

  const createShipHandler = async (ship: Ship) => {
    try {
      await axios.post(`${apiEndpoint}ships`, ship);

      dispatchShips({ type: "CREATE_SUCCESS", payload: ship });
    } catch (error) {
      dispatchShips({ type: "FAILURE" });
    }
  };

  const removeShipHandler = async (code: string) => {
    try {
      await axios.delete(`${apiEndpoint}ships\\${code}`);

      dispatchShips({ type: "DELETE_SUCCESS", payload: code });
    } catch (error) {
      dispatchShips({ type: "FAILURE" });
    }
  };

  const updateShipHandler = async (ship: Ship) => {
    try {
      await axios.put(`${apiEndpoint}ships\\${ship.code}`, ship);

      dispatchShips({ type: "UPDATE_SUCCESS", payload: ship });

      unSelectShipToEdit();
    } catch (error) {
      dispatchShips({ type: "FAILURE" });
    }
  };

  const unSelectShipToEdit = () => setShipToEdit(undefined);

  const selectShipToEdit = (ship: Ship) => setShipToEdit(ship);

  const onFormSubmitHandler = (ship: Ship) =>
    shipToEdit ? updateShipHandler(ship) : createShipHandler(ship);

  return (
    <>
      <h1>Ship management</h1>
      <div>
        <ShipForm
          onFormSubmit={onFormSubmitHandler}
          onCancelSubmit={unSelectShipToEdit}
          ship={shipToEdit}
        />
      </div>
      {ships.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {ships.isError && <Alert>Something went wrong...</Alert>}
          {
            <ShipsTable
              data={ships.data}
              removeShip={removeShipHandler}
              selectShipToEdit={selectShipToEdit}
            />
          }
        </div>
      )}
    </>
  );
};

export default App;
