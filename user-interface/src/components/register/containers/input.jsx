import React from "react";

const Input = (props) => {
  return (
    <div className="register__form-wrapper__form-input">
      {" "}
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => {
          props.changeData(props.name, e.target.value);
        }}
        placeholder={props.placeholder}
        required
      />
      {props.errors && <span className="error">{props.errors}</span>}
    </div>
  );
};

export default Input;
