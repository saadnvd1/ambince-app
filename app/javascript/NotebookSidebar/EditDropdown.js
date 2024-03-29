import React, { useMemo } from "react";
import { Dropdown } from "antd";
import { EditOutlined, SmileOutlined } from "@ant-design/icons";
import {
  PencilSquareIcon,
  TrashIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";

const EditDropdown = ({ isSubnotebook, notebookId, toggleIsEditing }) => {
  const handleDelete = () => {};

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
      <EditOutlined />
    </Dropdown>
  );
};

export default EditDropdown;
