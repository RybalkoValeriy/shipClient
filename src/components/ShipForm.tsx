import Ship from "../Models/Ship";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const shipFormSchema = yup.object().shape({
  code: yup
    .string()
    .required("The code is a required")
    .matches(/^[A-Za-z]{4}-\d{4}-[A-Za-z]\d$/, "Invalid a code format"),
  name: yup.string().required("The name is a required"),
  length: yup.number().required("The length should be more than 1").min(1),
  width: yup.number().required("The width should be more than 1").min(1),
});

type ShipFormProps = {
  onFormSubmit: SubmitHandler<Ship>;
  onCancelSubmit: () => void;
  ship?: Ship | undefined;
};

const ShipForm: React.FC<ShipFormProps> = ({
  onFormSubmit,
  onCancelSubmit,
  ship,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm<Ship>({ resolver: yupResolver(shipFormSchema) });

  const handleFromSubmit = handleSubmit(onFormSubmit);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (ship) {
      Object.entries(ship).forEach(([key, value]) => {
        setValue(key as keyof Ship, value);
      });
    }
  }, [isSubmitSuccessful, reset, setValue, ship]);

  return (
    <div>
      <form onSubmit={handleFromSubmit}>
        <div>
          <label>Code (Format: XXXX-0000-X0):</label>
          <input
            placeholder="code in Format: XXXX-0000-X0"
            {...register("code")}
          />
          {errors?.code && <p>{errors.code.message}</p>}
        </div>

        <br />
        <div>
          <label>Name:</label>
          <input placeholder="The name is required" {...register("name")} />
          {errors?.name && <p>{errors.name.message}</p>}
        </div>

        <br />
        <div>
          <label>Length:</label>
          <input
            placeholder="The length is required min 1"
            {...register("length")}
          />
          {errors?.length && <p>{errors.length.message}</p>}
        </div>

        <br />
        <div>
          <label>Width:</label>
          <input
            placeholder="The width is required min 1"
            {...register("width")}
          />
          {errors?.width && <p>{errors.width.message}</p>}
        </div>

        <br />
        <button type="submit">{ship ? "Update" : "Create"}</button>
        {ship ? (
          <button
            type="reset"
            onClick={() => {
              onCancelSubmit();
              reset();
            }}
          >
            Reset
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default ShipForm;
