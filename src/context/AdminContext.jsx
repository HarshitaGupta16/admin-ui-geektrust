import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import userReducer from "../reducer/UserReducer";

const adminContext = createContext();

const AdminContext = ({ children }) => {
  const [userData, dispatch] = useReducer(userReducer, []);

  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    dispatch({
      type: "ADD_USERS",
      payload: jsonData.map((user) => {
        return { ...user, isChecked: false };
      }),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editUser = (user) => {
    dispatch({
      type: "EDIT_USER",
      payload: user,
    });
  };

  const deleteUser = (userId) => {
    dispatch({
      type: "DELETE_USER",
      payload: userId,
    });
  };

  const deleteSelectedUser = () => {
    dispatch({
      type: "DELETE_SELECTED_USERS",
      // payload: selectedUsers,
    });
  };

  const addUsers = (users) => {
    dispatch({
      type: "ADD_USERS",
      payload: users,
    });
  };

  const selectUsers = (user) => {
    dispatch({
      type: "SELECT_USERS",
      payload: {
        user: user,
        // checked: checked,
      },
    });
  };

  return (
    <adminContext.Provider
      value={{
        userData,
        editUser,
        deleteUser,
        deleteSelectedUser,
        addUsers,
        selectUsers,
      }}
    >
      ,{children}
    </adminContext.Provider>
  );
};

export default AdminContext;

export const AdminState = () => {
  return useContext(adminContext);
};
