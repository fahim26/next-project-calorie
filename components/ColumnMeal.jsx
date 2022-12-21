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
} from "../Func Folder/AdminCRUD";
import { EditMealMenu } from "./admin/MealMenu";



function renderEditedMealMenu(params) {

  // console.log("#################   Params    ############## :",params.value);
  return <div>{params.value}</div>;
}

renderEditedMealMenu.propTypes = {

  value: PropTypes.string.isRequired,
};

// const renderMealMenuForEdit = (params,MealDescription) => {
//   // console.log(" __________________ ---   renderRatingEditInputCell --- __________________ : ", params );
//   return <EditMealMenu params = {params} MealDescription={MealDescription} />;
// };



const ColumnMeal = (
  rowModesModel,
  setRowModesModel,
  mutateEntry,
  mutateAvg,
  setAddedRows,
  foodRows,
  addedRows,
  MealDescription,
) => {
  // const MealDescription = MealDescription;
  
  const handleSaveClick = (id) => () => {
    console.log("################################ USER COLUMN ############ ");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  };
  const handleEditClick = (id) => () => {
    console.log("################################ USER EDIT ############ ");
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
        await fetch("/api/mealEntry", {
          method: "PUT",
          body: JSON.stringify(id),
        });

        const filteredRows = foodRows.filter((row) => row.id !== id);
        // console.log("filteredRows : ", filteredRows);
        return filteredRows;
      },
      { revalidate: true }
    );
    // await mutateAvg(mutateAvgCalorie, { revalidate: true });
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setAddedRows();
    const editedRow = foodRows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      const uData = foodRows.filter((row) => row.id !== id);
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
        console.log("calorie : ", params.props.value);
        return { ...params.props, error: !isValidCalorie };
      },
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
      renderEditCell: (params) => {
        console.log("****************************************** 7777777777777777 ********************************************** ", MealDescription);
        return <EditMealMenu params = {params} MealDescription={MealDescription} />;
      }
       
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

export default ColumnMeal;
