import React, { useEffect, useMemo, useState } from "react";

import {
  UsersIcon,
  RocketLaunchIcon,
  HeartIcon,
  PencilSquareIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import LogoFull from "images/logo-full.jpg";
import "./Root.css";
import UserSettings from "UserSettings";

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

  useEffect(() => {
    if (
      !window.location.href.includes("inspiration") &&
      !window.location.href.includes("gratitude")
    ) {
      navigate("/journal");
    }
  }, []);

  return (
    <div id="root-container">
      <div className="nav-container">
        <a onClick={() => navigate("/journal")}>
          <img
            src={LogoFull}
            style={{
              width: 130,
              height: 60,
              cursor: "pointer",
            }}
          />
        </a>
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
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active-link" : ""
          }
          to={"/support"}
        >
          <p className="nav-item">
            <RocketLaunchIcon height={24} /> Support
          </p>
        </NavLink>
        <UserSettings />
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
