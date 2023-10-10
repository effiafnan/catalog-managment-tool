import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridLogicOperator,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import GlobalContext from "../../context/GlobalContext";

const columns = [
  { field: "id", headerName: "friendlyProductId", width: 130 },
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
  { field: "attribute1", headerName: "1", width: 130 },
  { field: "attribute2", headerName: "2", width: 130 },
  { field: "attribute3", headerName: "3", width: 130 },
  { field: "attribute4", headerName: "4", width: 130 },
  { field: "attribute5", headerName: "5", width: 130 },
  { field: "attribute6", headerName: "6", width: 130 },
  { field: "attribute7", headerName: "7", width: 130 },
  { field: "attribute8", headerName: "8", width: 130 },
  { field: "attribute9", headerName: "9", width: 130 },
  { field: "attribute11", headerName: "10", width: 130 },
  { field: "superCategoryUrl", headerName: "superCategoryUrl", width: 130 },
  { field: "categoryNameUrl", headerName: "categoryNameUrl", width: 130 },
  { field: "productNameUrl", headerName: "productNameUrl", width: 130 },
  { field: "productId", headerName: "productId", width: 130 },
];

export default function DataTable({ filterValue, searchQuery }) {
  const [rows, setRows] = useState([]);
  const {
    globalCsvTableData,
    countryFilter,
    superCategoryFilter,
    categoryFilter,
  } = React.useContext(GlobalContext);

  useEffect(() => {
    setRows(globalCsvTableData);
  }, [globalCsvTableData]);

  // useEffect(() => {
  //   if (searchQuery) {
  //     const filteredRows = rows.filter((row) => {
  //       return (
  //         Object.values(row).some((value) => value?.toLowerCase() == searchQuery.toLowerCase())
  //       );
  //     });
  //     setRows(filteredRows);
  //   }else{
  //     setRows(rows);
  //   }
  // }, [searchQuery, rows]);

  const initfilterModel = {
    items: [{ field: "", operator: "contains", value: "" }],
  };
  const [filterModel, setFilterModel] = useState(initfilterModel);

  useEffect(() => {
    if (countryFilter && superCategoryFilter && categoryFilter) {
      setFilterModel({
        items: [
          {
            field: "categoryName",
            operator: "contains",
            value: categoryFilter,
          },
        ],
      });
    } else if (countryFilter && superCategoryFilter) {
      setFilterModel({
        items: [
          {
            field: "superCategory",
            operator: "contains",
            value: superCategoryFilter,
          },
        ],
      });
    } else if (countryFilter) {
      setFilterModel({
        items: [
          { field: "country", operator: "contains", value: countryFilter },
        ],
      });
    } else {
      setFilterModel({
        items: [{ field: "", operator: "contains", value: "" }],
      });
    }
  }, [categoryFilter, superCategoryFilter, countryFilter]);

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
      />
    </div>
  );
}
