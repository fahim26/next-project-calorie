
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

export default function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const { mutate } = useSWRConfig();
      
    const handleClick = async () => {
      const data = await mutate("/api/entryList");
      let new_id = data.length !== 0 ? (Math.max(...data.map((o) => o.id)) + 1) : 1;
      let new_row = {
        id: new_id,
        userEmail: "abc@gmail.com",
        foodName: "Food",
        calorieValue: "10",
        takenAt: String(moment()),
        isNew: true,
      };
  
      setRows([...data, new_row]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [new_id]: { mode: GridRowModes.Edit, fieldToFocus: "userEmail" },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }