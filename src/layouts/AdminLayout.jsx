import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Cursos.css";
import "../assets/css/styles.css";
import logo from "../assets/images/logo.png"; 
import userGabigol from "../assets/images/userGabigol.png"; 
import { Outlet } from "react-router-dom";

function CursosLayout() {
  const wrapperRef = useRef(null);

  const handleToggle = () => {
    wrapperRef.current.classList.toggle("toggled");
  };

  return (
    <div className="App">
      <div className="d-flex" id="wrapper" ref={wrapperRef}>
        <div className="bg-primary" id="sidebar-wrapper">
          <div className="sidebar-heading text-center py-4 text-white text-uppercase">
            <span className="fs-7 fw-bold align-middle">MESTRE DIGITAL</span>
          </div>

          <div className="list-group list-group-flush my-3">
            <NavLink
              to="/adminCursos/home"
              className="list-group-item list-group-item-action bg-transparent text-white"
              activeClassName="active"
            >
              <i className="fas fa-tachometer-alt me-2" />
              Painel Admin
            </NavLink>
            <NavLink
              to="/adminCursos/cursosAdmin"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-comment-dots me-2" />
              Cursos
            </NavLink>
            <NavLink
              to="/adminCursos/professor"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-support me-2" />
              Professor
            </NavLink>
            <NavLink
              to="/adminCursos/aluno"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-support me-2" />
              Aluno
            </NavLink>
            <NavLink
              to="/adminCursos/admin"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-support me-2" />
              Admin
            </NavLink>
            <NavLink
              to="/"
              className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
            >
              <i className="fas fa-power-off me-2" />
              Sair
            </NavLink>
          </div>

          <NavLink to="/">
            <img
              src={logo}
              alt="Cursos Digitais"
              style={{
                width: "100px",
                marginRight: "10px",
                marginLeft: "60px",
              }}
            />
          </NavLink>
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-primary py-4 px-3">
            <div className="d-flex align-items-center">
              <i
                className="fas fa-align-left text-white fs-4 me-3"
                id="menu-toggle"
                onClick={handleToggle}
              />
              <h2 className="fs-3 m-0 text-white">Painel do Admin</h2>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle second-text fw-bold d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={userGabigol}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    Vitor 
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Perfil
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Configurações
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Sair
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid px-4">
            <div className="row my-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CursosLayout;
