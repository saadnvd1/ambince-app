import React, { useEffect, useMemo, useState } from "react";

import {
  UsersIcon,
  CalendarDaysIcon,
  HeartIcon,
  PencilSquareIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import GlobalComponents from "GlobalComponents";
import LogoFull from "images/logo-full.jpg";
import LogoCollapsed from "images/logo-collapsed.png";
import { ROUTE_MAP } from "./constants";
import "./Root.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const Root = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => navigate("/journal"), []);

  return (
    <div id="root-container">
      <div className="nav-container">
        <img
          src={LogoFull}
          style={{
            width: 130,
            height: 60,
          }}
        />
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link" : ""
          }
          to={"/journal"}
        >
          <p className="nav-item">
            <PencilSquareIcon height={24} /> Journal
          </p>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link" : ""
          }
          to={"/gratitude"}
        >
          <p className="nav-item">
            <HeartIcon height={24} /> Gratitude
          </p>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link" : ""
          }
          to={"/inspiration"}
        >
          <p className="nav-item">
            <LightBulbIcon height={24} /> Inspiration
          </p>
        </NavLink>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <div>
          <b>We're here for you ❤️</b>
        </div>
        <a href="mailto:help@ambince.com">help@ambince.com</a>
      </div>
    </div>
  );
};
export default Root;
