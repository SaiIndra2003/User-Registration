import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./styles.scss";
import { getUser, updateUser } from "../api/api";
import Input from "./containers/input";
import Gender from "./containers/gender";
import DOB from "./containers/Dob";

const changeDate = (Dob) => {
  const [day, month, year] = Dob.split("-");
  const dateofbirt = `${year}-${month}-${day}`;
  return dateofbirt;
};

const Profile = () => {
  const [data, setData] = useState({});
  const [dob, setDob] = useState("");
  const [edit, setEdit] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const changeData = (name, value) => {
    setSubmit(true);
    setData({
      ...data,
      [name]: value,
    });
  };

  // Get request
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

  //patch request

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
      setEdit(false);
    } else {
      alert("No changes have made yet to submit");
    }
  };

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

          <Input
            label="Name:"
            value={data.name}
            edit={!edit}
            changeData={changeData}
            name="name"
          />

          <Input
            label="Email:"
            value={data.email}
            edit={!edit}
            changeData={changeData}
            name="email"
          />

          <Input
            label="Contact:"
            value={data.contact}
            edit={!edit}
            changeData={changeData}
            name="contact"
          />

          <DOB
            label="DOB:"
            edit={!edit}
            dob={dob}
            name="dateofbirth"
            value={data.dateofbirth}
            changeData={changeData}
          />

          <Gender
            label="Gender:"
            edit={!edit}
            value={data.gender}
            name="gender"
            changeData={changeData}
          />

          <div className="profile__content__button">
            {edit && <button type="submit">submit</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
