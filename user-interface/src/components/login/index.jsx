import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api/api";

import "./styles.scss";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCheck = () => {
    setVisible(!visible);
  };

  const validateForm = () => {
    let errors = {};
    if (!username.trim()) {
      errors.userName = "Enter user Name";
    }
    if (!password.trim()) {
      errors.password = "Enter password...";
    } else if (password.length < 8) {
      errors.password = "Password should have atleas 8 characters...";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm());
    if (Object.keys(errors).length === 0) {
      try {
        const data = {
          username: username,
          password: password,
        };
        const response = await loginUser(data);
        alert(response.message);
        navigate("/profile");
      } catch (err) {
        alert(err.message);
      }
    }
    setUsername("");
    setPassword("");
    setErrors({});
    setVisible(false);
  };

  return (
    <div className="login">
      <div className="login__content-wrapper">
        <h2>Login</h2>
      </div>
      <div className="login__form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="login__form-wrapper__form-input">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Name"
              required
            />
            {errors.name && <span className="error">{errors.userName}</span>}
          </div>
          <div className="login__form-wrapper__form-input">
            {" "}
            <input
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            {visible ? (
              <FaEyeSlash onClick={handleCheck} />
            ) : (
              <FaEye onClick={handleCheck} />
            )}
          </div>
          <div className="login__form-wrapper__button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
