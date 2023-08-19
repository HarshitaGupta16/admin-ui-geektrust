import React from "react";
import { useState } from "react";
import { Checkbox, TableCell, TableRow, IconButton } from "@mui/material";
import { AdminState } from "../context/AdminContext";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import SaveIcon from "../assets/icons/SaveIcon";

const SingleUser = ({ user, toggleCheckBoxes }) => {
  const { editUser, deleteUser } = AdminState();
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputRole, setInputRole] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    let updatedUser = user;
    if (inputName) {
      updatedUser = { ...updatedUser, name: inputName };
    }
    if (inputEmail) {
      updatedUser = { ...updatedUser, email: inputEmail };
    }
    if (inputRole) {
      updatedUser = { ...updatedUser, role: inputRole };
    }
    setIsEditing(false);
    editUser(updatedUser);
    setInputName("");
    setInputEmail("");
    setInputRole("");
  };

  return (
    <TableRow key={user.id}>
      <TableCell>
        <Checkbox
          onChange={toggleCheckBoxes}
          checked={user.isChecked}
          id={user.id}
        />
      </TableCell>
      <TableCell>
        {!isEditing ? (
          user.name
        ) : (
          <input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName ? inputName : user.name}
            style={{ border: "0.5px solid lightgrey" }}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEditing ? (
          user.email
        ) : (
          <input
            onChange={(e) => setInputEmail(e.target.value)}
            value={inputEmail ? inputEmail : user.email}
            style={{ border: "0.5px solid lightgrey" }}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEditing ? (
          user.role
        ) : (
          <input
            onChange={(e) => setInputRole(e.target.value)}
            value={inputRole ? inputRole : user.role}
            style={{ border: "0.5px solid lightgrey" }}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEditing ? (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={editHandler}>
            <SaveIcon />
          </IconButton>
        )}
        <IconButton onClick={() => deleteUser(user.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SingleUser;
