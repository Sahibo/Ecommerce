import React from "react";
import { Field, ErrorMessage } from "formik";

export default function InputField(props) {
    
  return (
    <div className="input-group-container">
      <label>{props.placeholder}</label>
      <Field className="input-container"
        type={props.type}
        id={props.id}
        name={props.name}
        validate={props.validate}
      />
      <ErrorMessage name={props.name} component="span" className="text-danger" />
    </div>
  );
}
