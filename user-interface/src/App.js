import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./components/home/index";
import Register from "./components/register/index";
import LoginForm from "./components/login/index";
import Profile from "./components/profile/index";

function App() {
  return (
    <div className="App">
      {/** Header */}
      <div className="App__content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {/** Footer */}
    </div>
  );
}

export default App;
