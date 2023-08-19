import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import UsersTable from "./UsersTable";
import { AdminState } from "../context/AdminContext";

const Search = () => {
  const { userData } = AdminState();

  const [searchString, setSearchString] = useState("");

  return (
    <Container>
      <TextField
        variant="outlined"
        style={{ width: "100%" }}
        fullWidth
        label="Search by name, email or role"
        onChange={(event) => setSearchString(event.target.value.toLowerCase())}
      />
      <UsersTable searchString={searchString} />
    </Container>
  );
};

export default Search;
