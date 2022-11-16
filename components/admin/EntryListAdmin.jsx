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
import useSWR, { mutate, useSWRConfig } from "swr";

import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { entryDelete, entryUpdate, EntryCreate, schemaObject } from "./AdminCRUD";
const fetcher = (url) => axios.get(url).then((response) => response.data);

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const EntryListAdmin = ({fallback}) => {
  const { data, error, mutate } = useSWR("/api/entryList", fetcher);

  const [rows, setRows] = useState(data);
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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    entryDelete(id);
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const mutateRow = EntryCreate();
  const update_Row = entryUpdate();
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: "Field cannot be empty", severity: "error" });
  }, []);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const input_date = moment(newRow.takenAt);
      const updatedRow = {
        ...newRow,
        takenAt: String(input_date._i),
        isNew: false,
      };
      const { id, isNew, ...rowDB } = updatedRow;
      let response;
      if (newRow.isNew) {
        response = await mutateRow(rowDB);
        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });
        const data = await mutate();
        setRows(data);
        let new_id = Math.max(...data.map((o) => o.id));
        const returnedRow = {
          id: new_id,
          ...response,
        };
        return returnedRow;
      } else {
        response = await update_Row({ ...rowDB, id });
        return response;
      }
    },
    [mutateRow, update_Row]
  );



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
      getActions: ({ id }) => {
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

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        backgroundColor: "#ccfff9",
        "& .Mui-error": {
          bgcolor: "#f5b5bc",
          color: "#ff4343",
        },
      }}
    >
      <DataGrid
        rows={rows}
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
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{
          newEditingApi: true,
          preventCommitWhileValidating: true,
        }}
      />
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
