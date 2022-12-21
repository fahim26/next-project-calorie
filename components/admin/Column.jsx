import React from "react";
import { GridRowModes, DataGrid,useGridApiContext, GridActionsCellItem, gridColumnLookupSelector } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {
  mutateAvgCalorie,
  mutationAddRows,
  schemaObject,
} from "../../Func Folder/AdminCRUD";
import { EditMealMenu } from "./MealMenu";



function renderEditedMealMenu(params) {

  // console.log("#################   Params    ############## :",params.value);
  return <div>{params.value}</div>;
}

renderEditedMealMenu.propTypes = {

  value: PropTypes.string.isRequired,
};

const renderMealMenuForEdit = (params) => {
  console.log(" __________________ ---   renderRatingEditInputCell --- __________________ : ", params );
  return <EditMealMenu {...params} />;
};



const Column = (
  rowModesModel,
  setRowModesModel,
  mutateEntry,
  mutateAvg,
  setAddedRows,
  foodRows,
  addedRows
) => {

  const handleSaveClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log("################################ SAVE CLICK ---- :",rowModesModel);

  };
  const handleEditClick = (id) => () => {
    if (
      Object.keys(rowModesModel).length === 0 &&
      typeof addedRows == "undefined"
    ) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };

  const handleDeleteClick = (id) => async () => {
    await mutateEntry(
      async (foodRows) => {
        await fetch("/api/foodEntry", {
          method: "PUT",
          body: JSON.stringify(id),
        });

        const filteredRows = foodRows.filter((row) => row.id !== id);
        console.log("filteredRows : ", filteredRows);
        return filteredRows;
      },
      { revalidate: true }
    );
    await mutateAvg(mutateAvgCalorie, { revalidate: true });
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


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "userEmail",
      headerName: "User Email",
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 300,
      preProcessEditCellProps: (params) => {
        const isValidEmail = schemaObject.emailSchema.test(
          String(params.props.value).toLowerCase()
        );

        return { ...params.props, error: !isValidEmail };
      },
    },
    {
      field: "foodName",
      headerName: "Food Name",
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 150,
      preProcessEditCellProps: (params) => {
        const isValidFoodName = schemaObject.foodSchema.test(
          String(params.props.value)
        );
        return { ...params.props, error: !isValidFoodName };
      },
    },
    {
      field: "calorieValue",
      type: "number",
      headerName: "Calorie Value",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,
      preProcessEditCellProps: (params) => {
        const isValidCalorie = schemaObject.calSchema.test(params.props.value);
        console.log("food name : ", params.props, " -- ", isValidCalorie);
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
      field: "Meal",
      headerName: "Meal",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      preProcessEditCellProps: (params) => {
        console.log("Pre preocess cell update --~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----: ",params);
        return { ...params.props, error: false };
      },
      renderCell: renderEditedMealMenu,
      renderEditCell: renderMealMenuForEdit,
      
     
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: (params) => {
        const id = params.id;
        // console.log("_________ ---------------------------------------  id >>> ",params,id);
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // console.log("-.-.-.-.-..-.-.-..-.-.-.-.-.-. : ", isInEditMode);
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
  return columns;
};

export default Column;
