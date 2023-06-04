import React from "react";

const Input = (props) => {
  return (
    <div className="profile__content__inputs">
      <label> {props.label} </label>
      <input
        value={props.value}
        disabled={props.edit}
        onChange={(e) => {
          props.changeData(props.name, e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
