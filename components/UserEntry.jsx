import axios from "axios";
import React, { useState } from "react";
import EntryListAdmin from "./admin/EntryListAdmin";
import { Box, Paper } from "@mui/material";
import useSWR from "swr";
import InfoAdd from "./InfoAdd";
import FoodEntryList from "./FoodEntryList";
import { MealsApiCall } from "./admin/MealsApiCall";
import MealAddButton from "./MealAddButton";
import { FoodEntriesPerEmail } from "./FoodEntriesPerEmail";
import Entries from "./admin/Entries";
import MealEntryCount from "./MealEntryCount";
const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

const fetcher = (url) => axios.get(url).then((response) => response.data);

const UserEntry = ({ sessionUser }) => {
  console.log("---------- UserEntry ---------- :::::::::::::::",sessionUser);
  const sessionEmail = sessionUser?.email;
  console.log("----- SSSSSSSSSSSSSSSS EEEEEEEEEEEEEEEEEEEEEE ---------- :::::::::::::::",sessionEmail);
  const { foodEntriesPerEmail, error, isLoading, mutateFoodPerEmail } =
    FoodEntriesPerEmail({sessionEmail});

  // useSWR(
  //   sessionUser ? ["/api/entriesPerEmail", sessionUser.email] : null,
  //   fetcherForUserInfo
  // );

  const { mealRows, isLoadingMeal, errorMealPerEmail, mutateMeal,breakfastCount,lunchCount,supperCount } =
    MealsApiCall({sessionEmail});

  const [MealDescription, setMealDescription] = useState([
    { mealID: "1", mealName: "Breakfast", currEntry: 0, maxEntry: 5 },
    { mealID: "2", mealName: "Lunch", currEntry: 0, maxEntry: 3 },
    { mealID: "3", mealName: "Supper", currEntry: 0, maxEntry: 2 },
  ]);

  const { nextNewId } = Entries();
  console.log(
    "======= ++++++++++++++++++++++++++++++++++++ :",
    foodEntriesPerEmail,
    mealRows
  );

  const timeUnix = new Date();
  const todayUnix = timeUnix.getTime();
  const yesterdayUnix = timeUnix.getTime() / 1000 - 24 * 3600;

  if (isLoadingMeal || isLoading) {
    return <div>Loading Wrapper</div>;
  }

  let tempList = [];
  // let brkfst = foodEntries.filter(
  //   (item) =>
  //     item.Meal === "Breakfast" &&
  //     item.takenAt >= yesterdayUnix &&
  //     item.takenAt <= todayUnix
  // ).length;

  // let lunch = foodEntries.filter(
  //   (item) =>
  //     item.Meal === "Lunch" &&
  //     item.takenAt >= yesterdayUnix &&
  //     item.takenAt <= todayUnix
  // ).length;

  // let supper = foodEntries.filter(
  //   (item) =>
  //     item.Meal === "Supper" &&
  //     item.takenAt >= yesterdayUnix &&
  //     item.takenAt <= todayUnix
  // ).length;

  tempList = MealDescription?.map((mealItem) => {
    let { mealName, ...rest } = mealItem;
    let { currEntry, ...restMealDescription } = mealItem;
    if (mealName === "Breakfast")
      return { ...restMealDescription, currEntry: breakfastCount };

    if (mealName === "Lunch")
      return { ...restMealDescription, currEntry: lunchCount };

    if (mealName === "Supper")
      return { ...restMealDescription, currEntry: supperCount };
  });

  // // setMealDescription(tempList);
  console.log(
    "================== ((((((((((((())))))))))))) >>>>>>>>>>>>>>>>>> : ",
    breakfastCount,
    lunchCount,
    supperCount,
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Paper
          sx={{
            flex: 2,
          }}
        >


          <InfoAdd
            sessionUser={sessionUser}
            foodEntries={foodEntriesPerEmail}
            mutateFoodPerEmail={mutateFoodPerEmail}
            MealDescription={tempList}
          />
          <MealEntryCount MealDescription={tempList} />
        </Paper>
        <Paper elevation={3}>
          <MealAddButton
            foodEntries={foodEntriesPerEmail}
            mealRows={mealRows}
            mutateFoodPerEmail={mutateFoodPerEmail}
            nextNewId={nextNewId}
          />
        </Paper>
        <Paper
          sx={{
            flex: 3,
          }}
        >
          <EntryListAdmin
            foodRows={mealRows}
            mutateEntry={mutateMeal}
            apiType="user"
            sessionUser={sessionUser}
            MealDescription={tempList}
          />
        </Paper>
      </Box>
      <Box>
        <Paper>
          <FoodEntryList foodEntries={foodEntriesPerEmail} />
        </Paper>
      </Box>
    </Box>
  );
};

export default UserEntry;
