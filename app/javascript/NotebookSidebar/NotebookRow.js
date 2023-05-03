import React, { useState } from "react";
import RowName from "NotebookSidebar/RowName";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import EditDropdown from "NotebookSidebar/EditDropdown";

const NotebookRow = ({
  isSubnotebook,
  selectedNotebookId,
  handleChangeNotebook,
  notebookId,
  notebookData,
  menu,
  toggleIsEditing,
  toggleSubmenu,
  hasSubnotebooks,
  collapsed,
}) => {
  const [hovered, setHovered] = useState(false);
  const classNames = [
    "single-menu-item",
    notebookId === selectedNotebookId ? "menu-selected" : "",
  ];

  return (
    <li
      className={classNames.join(" ")}
      onClick={() => handleChangeNotebook(notebookId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="parent-menu-title">
        <RowName
          name={notebookData.name}
          notebookId={notebookId}
          isEditing={menu[notebookId]?.isEditing}
          toggleIsEditing={toggleIsEditing}
          isSubnotebook={isSubnotebook}
          collapsed={collapsed}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {hasSubnotebooks && !isSubnotebook && (
            <div style={{ marginRight: hovered ? 8 : 0 }}>
              {!menu[notebookId]?.showSubMenu && (
                <CaretDownFilled onClick={() => toggleSubmenu(notebookId)} />
              )}
              {menu[notebookId]?.showSubMenu && (
                <CaretUpFilled onClick={() => toggleSubmenu(notebookId)} />
              )}
            </div>
          )}
          {hovered && (
            <EditDropdown
              isSubnotebook={false}
              notebookId={notebookId}
              toggleIsEditing={toggleIsEditing}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default NotebookRow;
