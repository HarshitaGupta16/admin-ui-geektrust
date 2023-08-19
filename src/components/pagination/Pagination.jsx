import React, { useState } from "react";
import "./Pagination.css";
import { IconButton } from "@mui/material";
import DoubleChevronsLeft from "../../assets/icons/DoubleChevronsLeft";
import DoubleChevronsRight from "../../assets/icons/DoubleChevronsRight";
import ChevronsLeft from "../../assets/icons/ChevronsLeft";
import ChevronsRight from "../../assets/icons/ChevronsRight";

const Pagination = ({ page, setPage, filteredData }) => {
  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(filteredData.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="pagination-container">
      <IconButton
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="chevron-btn"
      >
        <DoubleChevronsLeft />
      </IconButton>
      <IconButton
        onClick={() => selectedPageHandler(page - 1)}
        disabled={page === 1}
        className="chevron-btn"
      >
        <ChevronsLeft />
      </IconButton>
      {[...Array(Math.ceil(filteredData?.length / 10))].map((_, index) => {
        return (
          <span
            className={
              page === index + 1 ? "page-number selected-page" : "page-number"
            }
            onClick={() => selectedPageHandler(index + 1)}
            key={index}
          >
            {index + 1}
          </span>
        );
      })}
      <IconButton
        style={{
          marginLeft: "10px",
        }}
        onClick={() => selectedPageHandler(page + 1)}
        disabled={page === Math.ceil(filteredData?.length / 10)}
        className="chevron-btn"
      >
        <ChevronsRight />
      </IconButton>
      <IconButton
        onClick={() => setPage(Math.ceil(filteredData?.length / 10))}
        disabled={page === Math.ceil(filteredData?.length / 10)}
        className="chevron-btn"
      >
        <DoubleChevronsRight />
      </IconButton>
    </div>
  );
};

export default Pagination;
