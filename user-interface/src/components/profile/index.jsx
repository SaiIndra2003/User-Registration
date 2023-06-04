import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./styles.scss";
import { getUser, updateUser } from "../api/api";

const Profile = () => {
  const [data, setData] = useState({});
  const [dob, setDob] = useState("");

  const [edit, setEdit] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const changeDate = (Dob) => {
    const [day, month, year] = Dob.split("-");
    const dateofbirt = `${year}-${month}-${day}`;
    return dateofbirt;
  };

  const fetchData = async () => {
    try {
      const response = await getUser();
      setData(response.data);
      setDob(changeDate(response.data.dateofbirth));
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submit) {
      try {
        const response = await updateUser(data);
        alert(response.message);
        setEdit(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("No changes have made yet to submit");
    }
  };

  if (data === null) {
    return <div>Loading...</div>;
  }
  //   console.log(data);
  return (
    <div className="profile">
      <div className="profile__welcome-name">
        <h2>Welcome {data.username}</h2>
      </div>
      <div className="profile__content">
        <form onSubmit={handleSubmit}>
          <div className="profile__content__edit">
            <FaEdit onClick={() => setEdit(!edit)} />
          </div>
          <div className="profile__content__inputs">
            <label> Name: </label>
            <input
              value={data.name}
              disabled={!edit}
              onChange={(e) => {
                setSubmit(true);
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="profile__content__inputs">
            <label> Email: </label>
            <input
              value={data.email}
              disabled={!edit}
              onChange={(e) => {
                setSubmit(true);
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="profile__content__inputs">
            <label> Contact: </label>
            <input
              value={data.contact}
              disabled={!edit}
              onChange={(e) => {
                setSubmit(true);
                setData({
                  ...data,
                  contact: e.target.value,
                });
              }}
            />
          </div>
          <div className="profile__content__inputs">
            <label> DOB: </label>
            {!edit ? (
              <input value={data.dateofbirth} disabled={!edit} />
            ) : (
              <input
                type="date"
                value={dob}
                onChange={(e) => {
                  setSubmit(true);
                  setData({
                    ...data,
                    dateofbirth: changeDate(e.target.value),
                  });
                }}
                defaultValue={dob}
              />
            )}
          </div>
          <div className="profile__content__inputs">
            <label> Gender: </label>
            {!edit ? (
              <input value={data.gender} disabled={!edit} />
            ) : (
              <select
                value={data.gender}
                onChange={(e) => {
                  setData({
                    ...data,
                    gender: e.target.value,
                  });
                  setSubmit(true);
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
          <div className="profile__content__button">
            {edit && <button type="submit">submit</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
