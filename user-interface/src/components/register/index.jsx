import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../api/api";

import "./styles.scss";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    let message = "";
    setErrors(validationErrors);

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
        {" "}
        <h2>Registration Form</h2>
      </div>
      <div className="register__form-wrapper">
        {" "}
        <form onSubmit={handleSubmit}>
          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your Name"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your Email"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="tel"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
              placeholder="Enter your Contact number"
              required
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <select
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="date"
              value={data.dateofbirth}
              onChange={(e) =>
                setData({ ...data, dateofbirth: e.target.value })
              }
              required
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              placeholder="Enter your User Name"
              required
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type={passCheck ? "password" : "text"}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter your Password"
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            {passCheck ? (
              <FaEyeSlash onClick={() => setCheck(!passCheck)} />
            ) : (
              <FaEye onClick={() => setCheck(!passCheck)} />
            )}
          </div>
          <div className="register__form-wrapper__form-input">
            {" "}
            <input
              type="text"
              value={confPassword}
              onChange={(e) => checkPassword(e.target.value)}
              placeholder="re-enter your Password"
              required
            />
            {errors.confPassword && (
              <span className="error">{errors.confPassword}</span>
            )}
          </div>
          <div className="register__form-wrapper__button">
            {" "}
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
