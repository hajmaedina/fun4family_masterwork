import React from "react";

export default function InputField(props) {
  const {
    type,
    name,
    value,
    onChange,
    onBlur,
    reference,
    error,
    placeholder,
  } = props;
  return (
    <div className={`${error && "was-validated"}`}>
      <input
        placeholder={placeholder}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
      />
      <div className="invalid-feedback mx-2">{error}</div>
    </div>
  );
}
