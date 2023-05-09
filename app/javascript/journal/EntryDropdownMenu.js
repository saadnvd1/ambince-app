import React, { useMemo } from "react";
import { Bars4Icon, TrashIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "antd";
import { destroyEntry } from "journal/journalSlice";
import { useDispatch } from "react-redux";

const EntryDropdownMenu = ({ entry }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    debugger;
    dispatch(destroyEntry(entry.id));
  };

  const handleMenuClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    switch (key) {
      case "delete":
        handleDelete();
        break;
      default:
        break;
    }
  };

  const items = useMemo(() => {
    const defaultItems = [
      {
        key: "delete",
        danger: true,
        label: "Delete",
        icon: <TrashIcon height="16" />,
      },
    ];

    return defaultItems;
  }, []);

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <Bars4Icon height={16} />
    </Dropdown>
  );
};

export default EntryDropdownMenu;
