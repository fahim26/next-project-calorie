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
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { bgcolor } from "@mui/system";
import { MealsList } from "../../Func Folder/MealsList";





export function EditMealMenu(props) {
    const { id, value, field } = props;
    let meal = value;                   
    const apiRef = useGridApiContext();
    // console.log(" #@%#%^@$#^&@&!$#!^!!!()_#_+___#*((*#&) : ",id,"-",field,"-",meal," ---:--- " ,props);
  
    const [mealCode, setMealCode] = React.useState("");
  
    const handleChange = (event,meal) => {
      // setMealCode(String(meal.props.value));
      // console.log("________ ******************************* 0000 : ",meal.props.value);
      apiRef.current.setEditCellValue({ id, field, value: meal.props.value });
    };
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ : ",meal);
  
    return (
      <Box
        sx={{
          bgcolor: "#a7c4f2",
        }}
      >
        
        <TextField
          id="country-code-select"
          select
          value={value}
          onChange={handleChange}
          // SelectProps={{
          //   renderValue: (meal) => meal,
          // }}
          sx={{
            width: "180px",
          }}
        >
          {MealsList.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label} {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    );
  }
  
  EditMealMenu.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.string,
  };
  


