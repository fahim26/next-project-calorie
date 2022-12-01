import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import EditToolbar from "./EditToolbar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import useSWR, {useSWRConfig } from "swr";

import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  schemaObject,
} from "./AdminCRUD";

import AVG_CALORIE from "./AVG_CALORIE";
import Entries from "./Entries";
import AVGEntries from "./AVGEntries";
const fetcher = (url) => axios.get(url).then((response) => response.data);

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setAddedRows: PropTypes.func.isRequired,
  addedRows: PropTypes.object,
  rowModesModel: PropTypes.object,
  rows: PropTypes.object,
};

const EntryListAdmin = () => {
  // const { mutate:mutateAvg } = useSWRConfig()
  const { avgRows , isLoadingAvg , mutateAvg } = AVGEntries();
  // const { data: rows, error, mutate } = useSWR("/api/entryList", fetcher);
  const { rows, isLoading,mutate } = Entries();
  // const { mutate } = useSWRConfig();
  // const { avgRows , isLoadingAvg , mutateAvg } = AVGEntries();
  // console.log("rows type", avgRows);
  const [addedRows, setAddedRows] = useState();
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleEditClick = (id) => () => {
    if (
      Object.keys(rowModesModel).length === 0 &&
      typeof addedRows == "undefined"
    ) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    
    await mutate(
      async (rows) => {
        await fetch("/api/foodEntry", {
          method: "PUT",
          body: JSON.stringify(id),
        });

        const filteredRows = rows.filter((row) => row.id !== id);
        console.log("filteredRows : ", filteredRows);
        return filteredRows;
      },
      { revalidate: true }
    );
    
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setAddedRows();
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      const uData = rows.filter((row) => row.id !== id);
      mutate([uData], false);
    }
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: "Field cannot be empty", severity: "error" });
  }, []);

  const processRowUpdate = React.useCallback(async (newRow) => {
    const input_date = moment(newRow.takenAt);
    const updatedRow = {
      ...newRow,
      takenAt: String(input_date._i),
      isNew: false,
    };
    const { isNew, ...resp } = updatedRow;
    const { id, ...rowDB } = resp;

    if (newRow.isNew) {
      mutate(
        async (rows) => {
          const updatedTodo = await fetch("/api/foodEntry", {
            method: "POST",
            body: JSON.stringify(rowDB),
          });
          const addedRow = await updatedTodo.json();
          console.log(" 000000000  in mutation 000000000");

          return [...rows, addedRow];
        },
        { revalidate: false }
      );
      // mutateAvg();
      mutateAvg(
        async () => {
          const avgRows = await fetch("/api/avgCalorie", {
            method: "GET",
            body: JSON.stringify(),
          });
          const avgRowsNew = await avgRows.json();
          console.log(" 000000000  in mutation 000000000",avgRowsNew);

          return avgRowsNew;
        },
        { revalidate: true }
      );
      // mutateAvg();
      console.log("00008988889:", avgRows);
      setAddedRows();

      setSnackbar({
        children: "User successfully saved",
        severity: "success",
      });

      return resp;
    } else {
      const options = { optimisticData: resp, rollbackOnError: true };

      mutate(
        async (rows) => {
          const updatedTodo = await fetch("/api/updateList", {
            method: "PUT",
            body: JSON.stringify(resp),
          });
          const updateRow = await updatedTodo.json();

          const filteredTodos = rows.filter((todo) => todo.id !== id);

          return [...filteredTodos, updateRow];
        },
        { revalidate: false }
      );

      return resp;
    }
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "userEmail",
      headerName: "User Email",
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      preProcessEditCellProps: (params) => {
        const isValidEmail = schemaObject.emailSchema.test(
          String(params.props.value).toLowerCase()
        );
        console.log("food name : ", params.props.value, " -- ", isValidEmail);
        return { ...params.props, error: !isValidEmail };
      },
    },
    {
      field: "foodName",
      headerName: "Food Name",
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      preProcessEditCellProps: (params) => {
        const isValidFoodName = schemaObject.foodSchema.test(
          String(params.props.value)
        );
        return { ...params.props, error: !isValidFoodName };
      },
    },
    {
      field: "calorieValue",
      headerName: "Calorie Value",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 200,
      preProcessEditCellProps: (params) => {
        const isValidCalorie = schemaObject.calSchema.test(
          String(params.props.value)
        );
        return { ...params.props, error: !isValidCalorie };
      },
    },
    {
      field: "takenAt",
      headerName: "Date Time",
      editable: true,
      type: "dateTime",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: (params) => {
        const id = params.id;

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        if (
          !isNaN(parseInt(Object.keys(rowModesModel)[0])) &&
          parseInt(Object.keys(rowModesModel)[0]) !== id
        ) {
          return [];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const newR = addedRows ? [...rows, addedRows] : rows;
  console.log("added Rows ==== " , addedRows);
  return (
    <Box
      sx={{
        height: 700,
        width: "100%",
        backgroundColor: "#ccfff9",
        "& .Mui-error": {
          bgcolor: "#f5b5bc",
          color: "#ff4343",
        },
      }}
    >
      <DataGrid
        rows={rows ? newR : []}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
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
            rows,
          },
        }}
        experimentalFeatures={{
          newEditingApi: true,
          preventCommitWhileValidating: true,
        }}
      />
      <AVG_CALORIE avgRows={avgRows}/>
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
