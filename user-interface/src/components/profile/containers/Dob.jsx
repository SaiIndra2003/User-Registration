import React from "react";

const DOB = (props) => {
  return (
    <div className="profile__content__inputs">
      <label> {props.label} </label>
      {props.edit ? (
        <input value={props.value} disabled={props.edit} />
      ) : (
        <input
          type="date"
          value={props.dob}
          onChange={(e) => {
            props.changeData(props.name, e.target.value);
          }}
          defaultValue={props.dob}
        />
      )}
    </div>
  );
};

export default DOB;
