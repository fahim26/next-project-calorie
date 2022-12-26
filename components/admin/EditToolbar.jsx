import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import {
  GridRowModes,
  DataGrid,
  useGridApiRef,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import useSWR, { useSWRConfig } from "swr";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import moment from "moment/moment";
import { Box, MenuItem, TextField } from "@mui/material";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

const meals = [
  {
    value: "1",
    label: "Breakfast",
  },
  {
    value: "2",
    label: "Lunch",
  },
  {
    value: "3",
    label: "Supper",
  },
];

export default function EditToolbar(props) {
  const {
    setAddedRows,
    setRowModesModel,
    addedRows,
    rowModesModel,
    foodRows,
    apiType,
    mutateEntry,
    sessionEmail,
  } = props;
  const { mutate } = useSWRConfig();

  // console.log(
  //   "********** ---------- (((((((((  ))))))))) -------- *********:",
  //   props
  // );
  const [mealCode, setMealCode] = React.useState("");

  const handleChange = (event) => {
    setMealCode(event.target.value);
  };
  
  const handleClick = async () => {
    let data = foodRows;
    // let apiName=null;
    // if(apiType === "admin"){
    //   apiName = "/api/entryList";
    // }else if(apiType === "user"){
    //   apiName = "user";
    // }
    // data = await mutateEntry(apiName);

    let new_id = data?.length !== 0 ? Math.max(...data.map((o) => o.id)) + 1 : 1;
    let emailString;
    if (apiType === "admin") {
      emailString = "abc@gmail.com";
    } else if (apiType === "user") {
      emailString = sessionEmail;
    }
    let new_row = {
      id: new_id,
      userEmail: emailString,
      foodName: "Food",
      calorieValue: 10,
      takenAt: new Date(),
      Meal: "Select Meal",
      isNew: true,
    };

    // console.log("---=== : ", new_row);
    if (Object.keys(rowModesModel).length === 0) {
      setAddedRows(new_row);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [new_id]: { mode: GridRowModes.Edit, fieldToFocus: "foodName" },
      }));
    }
  };

  return (
    <GridToolbarContainer>
      <Button
        disabled={addedRows || Object.keys(rowModesModel).length > 0}
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
