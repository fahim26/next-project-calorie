import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import EditToolbar from "./EditToolbar";

import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  mutateAvgCalorie,
  mutationAddRows,
  schemaObject,
} from "../../Func Folder/AdminCRUD";

import AVG_CALORIE from "./AVG_CALORIE";
import Entries from "./Entries";
import AVGEntries from "./AVGEntries";
import TwoWeekReport from "./TwoWeekReport";
import { Divider, LinearProgress, Paper } from "@mui/material";
import Column from "./Column";
import ColumnMeal from "../ColumnMeal";

const fetcher = (url) => axios.get(url).then((response) => response.data);

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setAddedRows: PropTypes.func.isRequired,
  addedRows: PropTypes.object,
  rowModesModel: PropTypes.object,
  rows: PropTypes.array,
  apiType: PropTypes.string,
  mutateEntry: PropTypes.func.isRequired,
  mutateAvg: PropTypes.func.isRequired,
  sessionEmail: PropTypes.string,
};

const EntryListAdmin = (props) => {
  console.log("---------- Entry List Admin ----------");
  // const { mutate:mutateAvg } = useSWRConfig()
  // const { data: rows, error, mutate } = useSWR("/api/entryList", fetcher);

  // const { foodRows, isLoading, mutate } = Entries();
  // console.log(" ************** Food Rows:",foodRows);

  // const { avgRows, isLoadingAvg, mutateAvg } = AVGEntries(foodRows);
  // console.log(" ************** AVERAGE ENTRIES:",avgRows);

  const foodRows = props.foodRows;
  // console.log(" ************** Food Rows:", foodRows);
  const avgRows = props.avgRows;
  const mutateEntry = props.mutateEntry;
  const mutateAvg = props.mutateAvg;
  const apiType = props.apiType;
  const sessionEmail = String(props.sessionUser?.email);

  const [addedRows, setAddedRows] = useState();
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  let rows = foodRows;
  let week1count = props.week1count;
  let week2count = props.week2count;
  //   if(apiType === "admin"){
  //   if (foodRows) {
  //     rows = foodRows[0];
  //     week1count = foodRows[1];
  //     week2count = foodRows[2];
  //   } else {
  //     rows = [];
  //   }
  // }else if (apiType === "user"){
  //   rows = foodRows;
  // }

  function convertDate(food) {
    let { takenAt, ...temp } = food;
    // let newTime = moment.unix(takenAt).format("MMMM d, YYYY h:mma");
    let newTime = new Date(takenAt * 1000);

    let newRowObject = {
      ...temp,
      takenAt: newTime.toLocaleString(),
    };

    return newRowObject;
  }

  const newFoods = foodRows?.map((f) => convertDate(f));
  // console.log(addedRows);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.error(error);
    setSnackbar({ children: "Field cannot be empty", severity: "error" });
  }, []);

  const processRowUpdate = React.useCallback(async (newRow) => {
    console.log("______________________________________ Start __________________________ ",newRow);
    const timeUnix = new Date(String(newRow.takenAt));
    const UpdatedTime = timeUnix.getTime() / 1000;
    // const dataWithUpdatedTime = {...restData,takenAt:UpdatedTime};


    const updatedRow = {
      ...newRow,
      // calorieValue: parseInt(calorieValue),
      takenAt: UpdatedTime,
      isNew: false,
    };
    const { isNew, ...resp } = updatedRow;
    const { id, ...rowDB } = resp;

    // if (newRow.isNew) {
    //   // console.log("----------  New Row ---------- : ", newRow);
    //   let apiName = null;
    //   if (props.apiType === "admin") {
    //     apiName = "/api/foodEntry";
    //   } else if (props.apiType === "user") {
    //     apiName = "/api/mealEntry";
    //   }
    //   if (props.apiType === "admin") {
    //     await mutateEntry(
    //       async (foodRows) => {
    //         const updatedTodo = await fetch("/api/foodEntry", {
    //           method: "POST",
    //           body: JSON.stringify(rowDB),
    //         });
    //         const addedRow = await updatedTodo.json();
    //         // const filteredRows = foodRows.filter(todo => todo.id !== addedRow)
    //         return [...foodRows, addedRow];
    //       },

    //       {
    //         optimisticData: (foodRows) => [...foodRows, resp],
    //         rollbackOnError: true,
    //       }
    //     );
    //     setAddedRows();

    //     await mutateAvg(mutateAvgCalorie, { revalidate: true });
    //   } else if (apiType === "user") {
    //     await mutateEntry(
    //       async (foodRows) => {
    //         const updatedTodo = await fetch("/api/mealEntry", {
    //           method: "POST",
    //           body: JSON.stringify(rowDB),
    //         });
    //         const addedRow = await updatedTodo.json();
    //         setAddedRows();
    //         // const filteredRows = foodRows.filter(todo => todo.id !== addedRow)
    //         return [...foodRows, addedRow];
    //       },
    //       { revalidate: false }
    //     );
    //   }
    //   // console.log("00008988889:", avgRows);

    //   setSnackbar({
    //     children: "User successfully saved",
    //     severity: "success",
    //   });
    //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //   return resp;
    // } else {
    //   const options = { optimisticData: resp, rollbackOnError: true };

    //   // const updatedOptimisticFoodRows = foodRows.map((row) =>
    //   //   row.id === id ? resp : row
    //   // );


    //   // console.log(
    //   //   "--------%%%%%%%%%%%%%%%%----------- >>>>>>>>>>>> :",
    //   //   updatedOptimisticFoodRows
    //   // );

    //   const dataWithAPItype = { ...resp, apiType: props.apiType };
    //   mutateEntry(
    //     async (foodRows) => {
    //       const updatedTodo = await fetch("/api/updateList", {
    //         method: "PUT",
    //         body: JSON.stringify(dataWithAPItype),
    //       });
    //       const updateRow = await updatedTodo.json();

    //       const filteredRows = foodRows.filter((row) => row.id !== id);

    //       return [...filteredRows, updateRow];
    //     },
    //     {revalidate:false}
    //   );

    //   // if (apiType === "admin") {
    //   //   await mutateAvg(mutateAvgCalorie, { revalidate: true });
    //   // }
    //   console.log("______________________________________ END __________________________");
    //   // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //   return resp;
    // }

          const dataWithAPItype = { ...resp, apiType: props.apiType };
      mutateEntry(
        async (foodRows) => {
          const updatedTodo = await fetch("/api/updateList", {
            method: "PUT",
            body: JSON.stringify(dataWithAPItype),
          });
          const updateRow = await updatedTodo.json();

          const filteredRows = foodRows.filter((row) => row.id !== id);

          return [...filteredRows, updateRow];
        },
        {revalidate:true}
      );
    console.log("______________________________________ END __________________________");
    return resp;
    
  }, []);

  let columns = [];
  if (apiType === "admin") {
    columns = Column(
      rowModesModel,
      setRowModesModel,
      mutateEntry,
      mutateAvg,
      setAddedRows,
      foodRows,
      addedRows
    );
  } else if (apiType === "user") {
    columns = ColumnMeal(
      rowModesModel,
      setRowModesModel,
      mutateEntry,
      mutateAvg,
      setAddedRows,
      foodRows,
      addedRows
    );
  }

  let rowsWithAddedDemo;
  if (typeof addedRows === "undefined") {
    rowsWithAddedDemo = newFoods;
  } else {
    // const {id,...restRowData} = addedRows;
    // if(id) {
    // if(rowModesModel?.mode === "edit"){
    // if (rowModesModel[id]?.mode !== GridRowModes.Edit)
    // console.log(
    //   "#$$$$$$$$$#$#$^%$^^^$$$$$$$$$$$$$$$$$$$$$$$$:",
    //   addedRows.id,
    //   props.foodRows.slice(-1).id
    // );
    if (props.foodRows?.slice(-1).id !== addedRows.id)
      rowsWithAddedDemo = [...newFoods, addedRows];
    // }
    // }
  }

  // console.log(
  //   "--------%%%%%%%%%%%%%%%%----------- >>>>>>>>>>>> :",
  //   rowsWithAddedDemo,
  //   " ++++++++++ ",
  //   addedRows,
  //   "---",
  //   rowModesModel
  // );
const width = (props.apiType === "admin" ? 1300 : 700);
const height = (props.apiType === "admin" ? 600 : 400);
  return (
    <Box
      sx={{
        marginBottom: "10px",
        backgroundColor: "#ccfff9",
        "& .Mui-error": {
          bgcolor: "#f5b5bc",
          color: "#ff4343",
        },
      }}
    >
      <Divider>ALL USER INFO</Divider>
      <Paper
        elevation={10}
        sx={{
          width: {width},
          height: {height},
          marginBottom: "10px",
          padding: "20px",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          // margin: "auto",
        }}
      >
        <DataGrid
          rows={foodRows ? rowsWithAddedDemo : []}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          sx={{
            // boxShadow: 2,
            // border: 5,
            // marginLeft: '50px',
            // borderColor: "primary.light",

            "& .super-app-theme--header": {
              backgroundColor: "#5dd465",
            },
            "& .MuiDataGrid-cell--editing": {
              bgcolor: "rgb(255,215,115, 0.19)",
              color: "#1a3e72",
              "& .MuiInputBase-root": {
                height: "100%",
              },
            },
          }}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              setAddedRows,
              setRowModesModel,
              addedRows,
              rowModesModel,
              foodRows,
              apiType,
              mutateEntry,
              mutateAvg,
              sessionEmail,
            },
          }}
          experimentalFeatures={{
            newEditingApi: true,
            preventCommitWhileValidating: true,
          }}
        />
      </Paper>
      {apiType === "admin" && <Divider>REPORT PAGE</Divider>}
      {apiType === "admin" && (
        <AVG_CALORIE
          avgRows={avgRows}
          week1count={week1count}
          week2count={week2count}
        />
      )}
      {/* <TwoWeekReport weeklyCount={[rows[1], rows[2]]} /> */}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={400}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};
export default EntryListAdmin;
