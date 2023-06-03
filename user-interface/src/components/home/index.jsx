import React from "react";
import { Link } from "react-router-dom";
import { Animate } from "react-simple-animate";

import "./styles.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__content-wrapper">
        <h1>Welcome</h1>
      </div>
      <Animate
        play={true}
        duration={1}
        start={{
          transform: "translateY(100px)",
          opacity:0
        }}
        end={{
          transform: "translateX(0px)",
          opacity:1
        }}
      >
        <div className="home__button-wrapper">
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
      </Animate>
    </div>
  );
};

export default Home;
