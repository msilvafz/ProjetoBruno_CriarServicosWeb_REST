import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProfessorHome from "../components/professor/HomeProfessor";
import Cadastro from "../components/professor/Cadastro";
import Cursos from "../components/professor/Cursos";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/StylesProfessor.css";
import logo from "../assets/images/logo.png";
import userGabigol from "../assets/images/userGabigol.png";

function App() {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      nome: "Sistemas",
      categoria: "Tecnologia",
      dificuldade: "Iniciante",
    },
    {
      id: 2,
      nome: "Instagram Business",
      categoria: "Redes Sociais",
      dificuldade: "Intermediario",
    },
    {
      id: 3,
      nome: "Whatsapp Business",
      categoria: "Redes Sociais",
      dificuldade: "Iniciante",
    },
    { id: 4, nome: "Direito", categoria: "Lei", dificuldade: "Intermediario" },
  ]);

  const wrapperRef = useRef(null);

  const handleToggle = () => {
    wrapperRef.current.classList.toggle("toggled");
  };

  const addCurso = (newCurso) => {
    setCursos((prevCursos) => [...prevCursos, newCurso]);
  };

  const updateCurso = (updatedCurso) => {
    setCursos((prevCursos) =>
      prevCursos.map((curso) =>
        curso.id === updatedCurso.id ? updatedCurso : curso
      )
    );
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
              to="/professorcursos/home"
              className="list-group-item list-group-item-action bg-transparent text-white"
              activeClassName="active"
            >
              <i className="fas fa-tachometer-alt me-2" />
              Painel Geral
            </NavLink>
            <NavLink
              to="/professorcursos/cadastro"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-project-diagram me-2" />
              Cadastrar Curso
            </NavLink>
            <NavLink
              to="/professorcursos/cursos"
              className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
              activeClassName="active"
            >
              <i className="fas fa-comment-dots me-2" />
              Cursos
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
              <h2 className="fs-3 m-0 text-white">Painel do Professor</h2>
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
                    Luis Eduardo
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
              <Routes>
                <Route path="/home" element={<ProfessorHome />} />
                <Route
                  path="/cadastro"
                  element={<Cadastro onAddCurso={addCurso} />}
                />
                <Route
                  path="/cursos"
                  element={
                    <Cursos cursos={cursos} onUpdateCurso={updateCurso} />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
