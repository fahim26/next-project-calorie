import React, { useEffect, useState } from "react";
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import useSWR, { useSWRConfig } from "swr";
import AVGEntries from "./AVGEntries";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
const fetcher = (url) => axios.get(url).then((response) => response.data);

const AVG_CALORIE = (props) => {

  const [avgRows, setAvgRows] = useState(props.avgRows);
  // const [mounted,setMounted] = useState(false);
  // const { data:twoWeekData, error,mutate } = useSWR(mounted ? "/api/twoWeekData" : null, fetcher);

  // useEffect(()=>{
  //   setMounted(true);
  // },[]);
  // console.log("TWO WEEEEEEEEEEEEEEEEEK DATA",twoWeekData);

  // const { rows, isLoading,mutate } = AVGEntries();
  // console.log("new : ",rows);
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
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "averageCalorie",
      headerName: "AVG",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];

  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >

      <Paper
        elevation={10}
        sx={{
          width: 500,
          height: 400,
          margin: "auto",
        }}
      >
        <DataGrid
          rows={props.avgRows ? props.avgRows : []}
          columns={columns}
          sx={{
            // boxShadow: 2,
            // border: 2,
            // backgroundColor: "#f3dcfa",
            // borderColor: "primary.light",
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
        />
      </Paper>

      <Paper
        elevation={10}
        sx={{
          width: 500,
          height: 400,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <Card
          sx={{
            width: 200,
            height: 200,
            marginRight: '20px',
            // padding:'20px',
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center" sx={{
                marginTop: '20px',
              }}>
                {props.week1count}
              </Typography>
              <Typography variant="h7" align='center' sx={{
                marginTop: '40px',
                marginLeft:'20px',
              }}>
                #Entry of Last Week
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            width: 200,
            height: 200,
          }}
        >
          <CardActionArea>
            <CardContent sx={{
              alignItems: "center",
            }}>
              <Typography variant="h5" gutterBottom align='center' sx={{
                marginTop: '20px',
              }}>
                {props.week2count}
              </Typography>
              <Typography variant="h7" align='center' sx={{
                marginTop: '40px',
              }}>
              #Entry of Week Before Last Week
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
   
    </Stack>
  );
};

export default AVG_CALORIE;
