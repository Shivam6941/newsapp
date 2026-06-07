
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function NavBar() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <>

      {/* TOP HEADER */}

      <div className="top-header">

        <div className="container-fluid">

          <div className="row">

            <div className="col-md-4 text-center text-md-start">
              🇮🇳 India
            </div>

            <div className="col-md-4 text-center">
              📅 {time.toLocaleDateString()} | ⏰ {time.toLocaleTimeString()}
            </div>

            <div className="col-md-4 text-center text-md-end">
              🔥 Breaking News
            </div>

          </div>

        </div>

      </div>

      {/* NAVBAR */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

        <div className="container-fluid">

          <NavLink className="navbar-brand fw-bold" to="/">
            📰 NewsAdda
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >

            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/business">
                  Business
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">
                  Entertainment
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/health">
                  Health
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/science">
                  Science
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/sports">
                  Sports
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/technology">
                  Technology
                </NavLink>
              </li>

            </ul>

          </div>

        </div>

      </nav>

    </>
  );
}

export default NavBar;