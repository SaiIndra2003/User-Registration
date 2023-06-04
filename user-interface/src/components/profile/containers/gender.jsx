import React from "react";

const Gender = (props) => {
  return (
    <div className="profile__content__inputs">
      <label>{props.label} </label>
      {props.edit ? (
        <input value={props.value} disabled={props.edit} />
      ) : (
        <select
          value={props.value}
          onChange={(e) => {
            props.changeData(props.name, e.target.value);
          }}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
        </select>
      )}
    </div>
  );
};

export default Gender;
