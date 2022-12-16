import axios from "axios";
import React, { useState } from "react";
import EntryListAdmin from "./admin/EntryListAdmin";
import { Box, Paper } from "@mui/material";
import useSWR from "swr";
import InfoAdd from "./InfoAdd";
import FoodEntryList from "./FoodEntryList";
const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

const fetcher = (url) => axios.get(url).then((response) => response.data);

const UserEntry = ({ sessionUser }) => {
  console.log("---------- UserEntry ----------");

  const {
    data: foodEntries,
    error,
    isLoading,
    mutate: mutateFoodPerEmail,
  } = useSWR(
    sessionUser ? ["/api/entriesPerEmail", sessionUser.email] : null,
    fetcherForUserInfo
  );

  const {
    data,
    isLoadingMeal,
    errorMealPerEmail,
    mutate: mutateMeal,
  } = useSWR(["/api/mealEntryList", sessionUser.email], fetcherForUserInfo);

  console.log("======= ++++++++++++++++++++++++++++++++++++ :",foodEntries, data);
  if (isLoadingMeal || isLoading) {
    return <div>Loading Wrapper</div>;
  }

  return (
    <Box>
      <Box
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Paper sx ={{
          flex:2,
        }}>
          <InfoAdd sessionUser={sessionUser} foodEntries={foodEntries} mutateFoodPerEmail={mutateFoodPerEmail}/>
        </Paper>
        <Paper sx ={{
          flex:3,
        }}>
        <EntryListAdmin foodRows={data} avgRows={null} mutateEntry={ mutateMeal} mutateAvg={null} apiType="user" sessionUser={sessionUser}/>
        </Paper>
      </Box>
      <Box>
        <Paper>
          <FoodEntryList foodEntries={foodEntries} />
        </Paper>
      </Box>
    </Box>
  );
};

export default UserEntry;
