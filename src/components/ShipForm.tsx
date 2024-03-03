import Ship from "../Models/Ship";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

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
    <Container fluid>
      <Form onSubmit={handleFromSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="Code">
            <Form.Label>Code (Format: XXXX-0000-X0):</Form.Label>
            <Form.Control
              type="text"
              placeholder="code in Format: XXXX-0000-X0"
              {...register("code")}
            />
            {errors?.code && (
              <Form.Text className="text-danger">
                {errors.code.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="The name is required"
              {...register("name")}
            />
            {errors?.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="Length">
            <Form.Label>Length:</Form.Label>
            <Form.Control
              type="number"
              placeholder="The length is required min 1"
              {...register("length")}
            />
            {errors?.length && (
              <Form.Text className="text-danger">
                {errors.length.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="Width">
            <Form.Label>Width:</Form.Label>
            <Form.Control
              type="number"
              placeholder="The width is required min 1"
              {...register("width")}
            />
            {errors?.width && (
              <Form.Text className="text-danger">
                {errors.width.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Button type="submit">{ship ? "Update" : "Create"}</Button>
          {ship ? (
            <Button
              type="reset"
              onClick={() => {
                onCancelSubmit();
                reset();
              }}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
        </Row>
      </Form>
    </Container>
  );
};

export default ShipForm;
