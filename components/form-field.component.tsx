import React, { ChangeEvent } from "react";
import { FC } from "preact/compat";

type FromFieldProps = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormFieldComponent: FC<FromFieldProps> = ({
  title,
  state,
  type,
  setState,
  isTextArea,
  placeholder,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setState(e.target.value);
  };

  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={handleChange}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormFieldComponent;
