import axios from "axios";
// import React from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";


const FoodEntryList = (props) => {
  console.log("____________________ ----------------- _____________________________");
  // const { data:foodEntry, error, mutate } = useSWR("/api/entriesPerEmail", fetcher);
  if(!props.foodEntries){
    return <div>No Daata</div>
  }
  // if(isLoading){
  //   return <LinearProgress />;
  // }
  const foods = props.foodEntries;
  const newFoods = foods?.map((f)=> convertDate(f));
  console.log("new Fodds --------- : ",newFoods);
  const columns = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "foodName", headerName: "Food Name", width: 150 },
    {
      field: "calorieValue",
      headerName: "Calorie Value",
      width: 150,
    },
    { field: "takenAt", headerName: "Date Time", width: 200 },
    { field: "Meal", headerName: "Meal", width: 100 },
  ];

  function convertDate(food){
    let {takenAt, ...temp} = food;
    // let newTime = moment.unix(takenAt).format("MMMM d, YYYY h:mma");
    let newTime = new Date(takenAt*1000);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "numeric",

    }
    
    let newRowObject = {
      id: temp.id,
      foodName: temp.foodName,
      calorieValue: temp.calorieValue,
      takenAt: newTime.toLocaleString(),
      Meal: temp.Meal,
    }
    console.log("=================*************** ======================:",newRowObject);
    return newRowObject;
  }
  return (
    <Box sx={{ height: 600 }}>
      <DataGrid
        rows={foods ? newFoods : []}
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