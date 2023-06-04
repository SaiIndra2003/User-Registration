import React from "react";

const Gender = (props) => {
  return (
    <div className="register__form-wrapper__form-input">
      <select
        value={props.value}
        onChange={(e) => props.changeData(props.name, e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
      </select>
      {props.errors && <span className="error">{props.errors}</span>}
    </div>
  );
};

export default Gender;
