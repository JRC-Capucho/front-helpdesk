import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/pages/home/home";
import Usuarios from "../views/pages/usuarios/usuarios";
import Cliente from "../views/pages/cliente/cliente";
import Setores from "../views/pages/setores/setores";
import TicketPage from "../views/pages/ticket/ticket";

const HomeRout = () => (
  <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/Usuarios" element={<Usuarios />} />
    <Route path="/Cliente" element={<Cliente />} />
    <Route path="/Setores" element={<Setores />} />
    <Route path="/Ticket" element={<TicketPage />} />
  </Routes>
);

export default HomeRout;
