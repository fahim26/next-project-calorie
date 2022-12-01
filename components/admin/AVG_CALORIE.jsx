import React, { useEffect, useState } from 'react';
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import useSWR, { useSWRConfig } from 'swr'
import AVGEntries from './AVGEntries';

const AVG_CALORIE = (props) => {
  console.log("avg:",props.avgRows);
  const [avgRows,setAvgRows] = useState(props.avgRows);


  // const { rows, isLoading,mutate } = AVGEntries();
  // console.log("new : ",rows);
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
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "averageCalorie",
      headerName: "AVG",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
   
  ];


  return (
    <DataGrid
        rows={ props.avgRows ? props.avgRows : []}
        columns={columns}
        />
  )
}

export default AVG_CALORIE;