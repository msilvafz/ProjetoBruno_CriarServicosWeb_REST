import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";


import Inicio from "./components/main/Inicio";
import Sobre from "./components/main/Sobre";
import Cursos from "./components/main/Cursos";
import Contato from "./components/main/Contato";

import AlunoLayout from "./layouts/AlunoLayout";
import AlunoCursosHome from "./components/aluno/Home";
import AlunoCursos from "./components/aluno/Cursos";
import AlunoCursosDetalhes from "./components/aluno/CursosDetalhes";
import AlunoSuporte from "./components/aluno/Suporte";

import ProfessorLayout from "./layouts/ProfessorLayout";
import ProfessorCadastro from "./components/professor/Cadastro";
import ProfessorCursos from "./components/professor/Cursos";
import ProfessorHome from "./components/professor/HomeProfessor";

import AdminLayout from "./layouts/AdminLayout"
import Aluno from "./components/admin/Aluno";
import CursosAdmin from "./components/admin/Cursos";
import Professor from "./components/admin/Professor";
import Home from "./components/admin/Home";

import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/css/App.css";
import SignUpCadastro from "./components/main/SignupCadastro";
import SignUpLogin from "./components/main/SingupLogin";
import Admin from "./components/admin/Admin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="contato" element={<Contato />} />
          <Route path="signup" element={<SignUpCadastro />} />
          <Route path="signuplogin" element={<SignUpLogin />} />
        </Route>

        <Route path="/alunocursos" element={<AlunoLayout />}>
          <Route path="home" element={<AlunoCursosHome />} />
          <Route path="cursos" element={<AlunoCursos />} />
          <Route path="cursos/:id" element={<AlunoCursosDetalhes />} />
          <Route path="suporte" element={<AlunoSuporte />} />
        </Route>

        <Route path="/professorcursos" element={<ProfessorLayout />}>
          <Route path="cadastro" element={<ProfessorCadastro />} />
          <Route path="cursos" element={<ProfessorCursos />} />
          <Route path="home" element={<ProfessorHome />} />
        </Route>

        <Route path="/adminCursos" element={<AdminLayout />}>
          <Route path="admin" element={<Admin />} />
          <Route path="professor" element={<Professor />} />
          <Route path="cursosAdmin" element={<CursosAdmin />} />
          <Route path="aluno" element={<Aluno />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
