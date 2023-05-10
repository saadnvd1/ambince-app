import { Avatar, Dropdown } from "antd";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { logout } from "slices/userSlice";

const UserSettings = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.user.email);

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleMenuClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    switch (key) {
      case "sign-out":
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const items = useMemo(() => {
    const defaultItems = [
      {
        key: "sign-out",
        danger: true,
        label: "Sign Out",
        icon: <ArrowLeftOnRectangleIcon height="16" />,
      },
    ];

    return defaultItems;
  }, []);

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <Avatar style={{ cursor: "pointer" }}>{email[0]}</Avatar>
    </Dropdown>
  );
};

export default UserSettings;
