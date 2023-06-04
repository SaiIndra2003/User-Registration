import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../api/api";
import Input from "./containers/input";

import "./styles.scss";
import Gender from "./containers/gender";
import Button from "./containers/button";
import PassSymbol from "./containers/checkPass";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    dateofbirth: "",
    username: "",
    password: "",
  });
  const [confPassword, checkPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passCheck, setCheck] = useState(true);

  const navigate = useNavigate();

  function validateForm() {
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(data.contact)) {
      errors.contact = "Contact number must be 10 digits";
    }

    if (!data.gender) {
      errors.gender = "Gender is required";
    }

    if (!data.dateofbirth) {
      errors.dob = "Date of Birth is required";
    }

    if (!data.username.trim()) {
      errors.username = "Username is required";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    }
    if (!data.password.match(/[@#$^&]/)) {
      errors.password =
        "Password should consist of atleast one special character such as : @ # $ ^ &";
    }

    if (!confPassword.trim()) {
      errors.confPassword = "Password is required";
    } else if (confPassword.trim() !== data.password.trim()) {
      errors.confPassword = "Passwords didnt matched...";
      errors.password = "Passwords didnt matched...";
    }

    return errors;
  }

  const changeData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const changePass = (name, value) => {
    checkPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    let message = "";
    setErrors(validationErrors);
    console.log(errors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const [year, month, day] = data.dateofbirth.split("-");
        const dob = `${day}-${month}-${year}`;
        const sentData = {
          ...data,
          dateofbirth: dob,
        };
        message = await registerUser(sentData);
        alert(message.message);
      } catch (err) {
        alert(err.message);
      }

      checkPassword("");
      setData({
        name: "",
        email: "",
        contact: "",
        gender: "",
        dateofbirth: "",
        username: "",
        password: "",
      });
      if (message.message === "User created succesfully...") {
        navigate("/");
      }
    }
  };

  return (
    <div className="register">
      <div className="register__content-wrapper">
        <h2>Registration Form</h2>
      </div>
      <div className="register__form-wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={data.name}
            placeholder="Enter Your name here"
            name="name"
            changeData={changeData}
            errors={errors.name}
          />

          <Input
            type="email"
            value={data.email}
            placeholder="Enter Mail-id"
            name="email"
            changeData={changeData}
            errors={errors.email}
          />

          <Input
            type="tel"
            value={data.contact}
            placeholder="Enter Contact"
            name="contact"
            changeData={changeData}
            errors={errors.contact}
          />

          <Gender name="gender" value={data.gender} errors={errors.gender} />

          <Input
            type="date"
            value={data.dateofbirth}
            placeholder="Enter Contact"
            name="dateofbirth"
            changeData={changeData}
            errors={errors.dob}
          />

          <Input
            type="text"
            value={data.username}
            placeholder="Enter your User Name"
            name="username"
            changeData={changeData}
            errors={errors.username}
          />

          <Input
            type={passCheck ? "password" : "text"}
            value={data.password}
            placeholder="Enter your Password"
            name="password"
            changeData={changeData}
            errors={errors.password}
          />

          {passCheck ? (
            <FaEyeSlash onClick={() => setCheck(!passCheck)} />
          ) : (
            <FaEye onClick={() => setCheck(!passCheck)} />
          )}

          <Input
            type="text"
            value={confPassword}
            placeholder="re-enter your Password"
            name="confPassword"
            changeData={changePass}
            errors={errors.confPassword}
          />

          <Button />
        </form>
      </div>
    </div>
  );
}

export default Register;
