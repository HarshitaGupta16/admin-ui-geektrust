import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import UsersTable from "./UsersTable";
import { AdminState } from "../context/AdminContext";

const Search = () => {
  const { userData } = AdminState();
  console.log(userData);

  const [filteredData, setFilteredData] = useState(userData);

  const filterDataHandler = (searchText) => {
    setFilteredData(
      userData?.filter(
        (user) =>
          user.name.includes(searchText) ||
          user.email.includes(searchText) ||
          user.role.includes(searchText)
      )
    );
  };

  return (
    <Container>
      <TextField
        variant="outlined"
        style={{ width: "100%" }}
        fullWidth
        label="Search by name, email or role"
        onChange={(event) => filterDataHandler(event.target.value)}
      />
      <UsersTable
        filteredData={filteredData.length ? filteredData : userData}
      />
    </Container>
  );
};

export default Search;
