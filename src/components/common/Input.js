import React from "react";
import { ErrorMessage, useField } from "formik";


export const Input = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);
    return (
      <>
        <label className="label" htmlFor={field.name}>
          {label}
        </label>
        <input
          {...field}
          {...props}
        />
        <ErrorMessage
          name={field.name}
          component="div"
        />
      </>
    );
};

export default Input;