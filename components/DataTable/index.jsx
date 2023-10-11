import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridLogicOperator,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import GlobalContext from "../../context/GlobalContext";

const columns = [
  { field: "friendlyProductId", headerName: "friendlyProductId", width: 130 },
  { field: "country", headerName: "country", width: 130 },
  { field: "superCategory", headerName: "superCategory", width: 130 },
  { field: "categoryName", headerName: "categoryName", width: 130 },
  { field: "productName", headerName: "productName	", width: 130 },
  { field: "menuFilter", headerName: "menuFilter", width: 130 },
  { field: "price", headerName: "price", width: 130 },
  { field: "currency", headerName: "currency", width: 130 },
  { field: "successRate", headerName: "successRate", width: 130 },
  { field: "minutesForTest", headerName: "minutesForTest", width: 130 },
  { field: "validityFrom", headerName: "Validity From", width: 130 },
  { field: "validityUntil", headerName: "Validity Until", width: 130 },
  { field: "1", headerName: "1", width: 130 },
  { field: "2", headerName: "2", width: 130 },
  { field: "3", headerName: "3", width: 130 },
  { field: "4", headerName: "4", width: 130 },
  { field: "5", headerName: "5", width: 130 },
  { field: "6", headerName: "6", width: 130 },
  { field: "7", headerName: "7", width: 130 },
  { field: "8", headerName: "8", width: 130 },
  { field: "9", headerName: "9", width: 130 },
  { field: "10", headerName: "10", width: 130 },
  { field: "superCategoryUrl", headerName: "superCategoryUrl", width: 130 },
  { field: "categoryNameUrl", headerName: "categoryNameUrl", width: 130 },
  { field: "productNameUrl", headerName: "productNameUrl", width: 130 },
  { field: "productId", headerName: "productId", width: 130 },
];

export default function DataTable({ filterValue, searchQuery }) {
  const API_KEY = "https://sheetdb.io/api/v1/819nekvayjt41";
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 50,
  });

  useEffect(() => {
    setRowCount((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCount]);
  const {
    globalCsvTableData,
    countryFilter,
    superCategoryFilter,
    categoryFilter,
  } = React.useContext(GlobalContext);

  useEffect(() => {
    setPaginationModel({ page: 0, pageSize: 50 });
  }, [countryFilter, , superCategoryFilter, categoryFilter]);

  useEffect(() => {
    fetch(`${API_KEY}/count?sheet=global-csv`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data sheet count", data);
        setRowCount(data?.rows ?? 0);
      });
  }, []);

  useEffect(() => {
    let queryString;
    if (countryFilter) {
      queryString = `${API_KEY}/search?country=${countryFilter}&sheet=global-csv`;
      if (superCategoryFilter) {
        queryString += `&superCategory=${superCategoryFilter}`;
      }
      if (categoryFilter) {
        queryString += `&categoryName=${categoryFilter}`;
      }
    } else {
      queryString = `${API_KEY}?sheet=global-csv&offset=${
        paginationModel.page * paginationModel.pageSize
      }&limit=${paginationModel.pageSize}`;
    }
    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      });
  }, [paginationModel, countryFilter, superCategoryFilter, categoryFilter]);

  const initfilterModel = {
    items: [{ field: "", operator: "contains", value: "" }],
  };
  const [filterModel, setFilterModel] = useState(initfilterModel);


  useEffect(() => {
    if (
      filterValue === "USD" ||
      filterValue === "EUR" ||
      filterValue === "GBP"
    ) {
      setFilterModel({
        items: [
          {
            field: "currency",
            operator: "contains",
            value: filterValue,
          },
        ],
      });
    } else if (filterValue === "missingMenu") {
      setFilterModel({
        items: [
          {
            field: "menuFilter",
            operator: "isEmpty",
          },
        ],
      });
    } else {
      setFilterModel({
        items: [{ field: "", operator: "contains", value: "" }],
      });
    }
  }, [filterValue]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        getRowId={(row) => {
          return row.friendlyProductId;
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [
                // {field: 'country', operator: 'contains', value: 'IT' },
                { field: "successRate", operator: "contains", value: "80" },
              ],
            },
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        checkboxSelection
        rowCount={rowCount}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
