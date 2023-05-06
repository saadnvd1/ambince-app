import React, { useMemo, useState } from "react";

import {
  UsersIcon,
  CalendarDaysIcon,
  HomeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
        <Link to={"/journal"}>Journal</Link>
        <Link to={"/gratitude"}>Gratitude</Link>
        <Link to={"/inspiration"}>Inspiration</Link>
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
