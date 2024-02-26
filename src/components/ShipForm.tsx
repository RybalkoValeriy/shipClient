import React from "react";

type shipFormProps = {
  onSubmitForm: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

export const ShipForm: React.FC<shipFormProps> = ({ onSubmitForm }) => {
  const h = (event: React.ChangeEvent<HTMLFormElement>) => {
    console.log(event);
  };

  return (
    <div>
      ShipForm
      <form onSubmit={onSubmitForm} onChange={h}>
        <label>Code (Format: XXXX-0000-X0):</label>
        <input
          type="text"
          id="code"
          required
          pattern="^[A-Za-z]{4}-\d{4}-[A-Za-z]\d$"
        />
        <br />

        <label>Name:</label>
        <input type="text" id="name" required />
        <br />

        <label>Length:</label>
        <input type="number" id="length" required min="1" />
        <br />

        <label>Width:</label>
        <input type="number" id="width" required min="1" />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
