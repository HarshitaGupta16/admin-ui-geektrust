import React, { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
} from "@mui/material";
import { AdminState } from "../context/AdminContext";
import SingleUser from "./SingleUser";
import Pagination from "./pagination/Pagination";
import styles from "./UsersTable.module.css";

const UsersTable = ({ searchString }) => {
  const { deleteSelectedUser, selectUsers, userData } = AdminState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);

  const filteredData = userData?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchString) ||
      user.email.toLowerCase().includes(searchString) ||
      user.role.toLowerCase().includes(searchString)
  );

  const toggleCheckBoxes = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    console.log(checked);
    console.log(e);
    if (name === "Select All") {
      for (let i = 0; i < filteredData.length; i++) {
        if (i === page * 10 - 10 || i < page * 10) {
          selectUsers({ ...filteredData[i], isChecked: checked });
        } else {
          selectUsers(filteredData[i]);
        }
      }
    } else {
      filteredData.map((user) => {
        if (user.id === e.target.id)
          selectUsers({ ...user, isChecked: checked });
        else {
          selectUsers(user);
        }
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={toggleCheckBoxes}
                  name="Select All"
                  checked={filteredData
                    .slice(page * 10 - 10, page * 10)
                    .every((user) => user.isChecked)}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length !== 0 ? (
              filteredData.slice(page * 10 - 10, page * 10)?.map((user) => {
                return (
                  <SingleUser
                    key={user.id}
                    user={user}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    toggleCheckBoxes={toggleCheckBoxes}
                  />
                );
              })
            ) : (
              <TableRow className={styles.noDataFound}>
                <TableCell>No Data Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.usersTableFooter}>
        <Button
          style={{
            backgroundColor: "#f43f5e",
            color: "white",
            borderRadius: 25,
            align: "left",
            textTransform: "none",
            padding: "6px 20px",
            marginTop: "20px",
          }}
          onClick={() => deleteSelectedUser(selectedRows)}
        >
          Delete Selected
        </Button>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={page}
            setPage={setPage}
            filteredData={filteredData}
          />
        </div>
      </div>
    </>
  );
};

export default UsersTable;
