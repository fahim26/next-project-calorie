import axios from "axios";
import React from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const FoodEntryList = () => {
  const { data:foods, error, mutate } = useSWR("/api/entryList", fetcher);
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "foodName", headerName: "Food Name", width: 250 },
    {
      field: "calorieValue",
      headerName: "Calorie Value",
      width: 150,
    },
    { field: "takenAt", headerName: "Date Time", width: 400 },
  ];
  return (
    <Box sx={{ height: 1200, width: "80%" }}>
      <DataGrid
        rows={foods ? foods : []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
 
}

export default FoodEntryList;