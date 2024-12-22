import {
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditTask } from "./EditTask";
import { CloneTask } from "./CloneTask";
import { DeleteTask } from "./DeleteTask";

export const MoreVerticalIconView = ({ selectedTaskObj, setTaskUpdated }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCloneDialog, setOpenCloneDialog] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuIconClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    const actions = {
      Edit: () => setOpenEditDialog(true),
      Delete: () => setOpenDeleteDialog(true),
      Clone: () => setOpenCloneDialog(true),
    };

    if (actions[option]) {
      actions[option](); // Call the corresponding action
    }

    handleMenuClose();
  };

  const vertIconOptions = [
    { id: 0, value: "Edit", component: <EditTask /> },
    { id: 1, value: "Clone", component: <CloneTask /> },
    { id: 2, value: "Delete", component: <DeleteTask /> },
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        onClick={handleMenuIconClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        onClose={handleMenuClose}
        open={Boolean(menuAnchorEl)}
      >
        {vertIconOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleMenuItemClick(option.value)}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
      <EditTask
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        selectedTaskObj={selectedTaskObj}
        setTaskEdited={setTaskUpdated}
      />
      <CloneTask
        open={openCloneDialog}
        onClose={() => setOpenCloneDialog(false)}
        selectedTaskObj={selectedTaskObj}
        setTaskCloned={setTaskUpdated}
      />
      <DeleteTask
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        tasknumber={selectedTaskObj?.tasknumber}
      />
    </div>
  );
};
