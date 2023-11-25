import {
  Briefcase,
  SquaresFour,
  Ticket,
  UserCircle,
  Users,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sessionHook from "../../../../api/hooks/session";
import "./sideBar.scss";

const Sidebar: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    nivel: null,
  });

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    sessionHook()
      .then((data: any) => {
        setUserInfo({
          name: data.name,
          nivel: data.nivel,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    const menuBtnChange = () => {
      if (sidebar?.classList.contains("open") && closeBtn) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else if (closeBtn) {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };
  }, []);

  return (
    <div className="sidebar">
      <ul className="nav_list">
        <li>
          <Link to="/Home">
            <a href="#">
              <i className="bx icons">
                <SquaresFour size={24} weight="light" />
              </i>
              <span className="links_name">Dashboard</span>
            </a>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <Link to="/Usuarios">
            <a href="#">
              <i className="bx icons">
                <Users size={24} weight="light" />
              </i>
              <span className="links_name">Usuário</span>
            </a>
          </Link>
          <span className="tooltip">Usuário</span>
        </li>
        <li>
          <Link to="/Cliente">
            <a href="#">
              <i className="bx icons">
                <UserCircle size={24} weight="light" />
              </i>
              <span className="links_name">Cliente</span>
            </a>
          </Link>
          <span className="tooltip">Cliente</span>
        </li>
        <li>
          <Link to="/Setores">
            <a href="#">
              <i className="bx icons">
                <Briefcase size={24} weight="light" />
              </i>
              <span className="links_name">Setores</span>
            </a>
          </Link>
          <span className="tooltip">Setores</span>
        </li>
        <li>
          <Link to="/Ticket">
            <a href="#">
              <i className="bx icons">
                <Ticket size={24} weight="light" />
              </i>
              <span className="links_name">Ticket</span>
            </a>
          </Link>
          <span className="tooltip">Ticket</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
