import axios from "axios";
import React, { useState } from "react";
import EntryListAdmin from "./admin/EntryListAdmin";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import InfoAdd from "./InfoAdd";
import FoodEntryList from "./FoodEntryList";
import { MealsApiCall } from "./admin/MealsApiCall";
import MealAddButton from "./MealAddButton";
import { FoodEntriesPerEmail } from "./FoodEntriesPerEmail";
import Entries from "./admin/Entries";
import MealEntryCount from "./MealEntryCount";
import FoodAddForm from "./FoodAddForm";
const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

const fetcher = (url) => axios.get(url).then((response) => response.data);

const UserEntry = ({ sessionUser }) => {
  console.log("---------- UserEntry ---------- :::::::::::::::", sessionUser);
  const sessionEmail = sessionUser?.email;
  console.log(
    "----- SSSSSSSSSSSSSSSS EEEEEEEEEEEEEEEEEEEEEE ---------- :::::::::::::::",
    sessionEmail
  );
  const { foodEntriesPerEmail, error, isLoading, mutateFoodPerEmail } =
    FoodEntriesPerEmail({ sessionEmail });

  // useSWR(
  //   sessionUser ? ["/api/entriesPerEmail", sessionUser.email] : null,
  //   fetcherForUserInfo
  // );

  const {
    mealRows,
    isLoadingMeal,
    errorMealPerEmail,
    mutateMeal,
    breakfastCount,
    lunchCount,
    supperCount,
  } = MealsApiCall({ sessionEmail });

  const [isEClicked, setisEClicked] = useState(false);
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
    supperCount
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#a7d6d9",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          {isEClicked === true ? (
            <FoodAddForm
            sessionUser={sessionUser}
            foodEntries={foodEntriesPerEmail}
            mutateFoodPerEmail={mutateFoodPerEmail}
            MealDescription={tempList}
          />
        
            // <InfoAdd
            //   sessionUser={sessionUser}
            //   foodEntries={foodEntriesPerEmail}
            //   mutateFoodPerEmail={mutateFoodPerEmail}
            //   MealDescription={tempList}
            // />
          ) : (
            <Paper elevation={10} onClick={() => setisEClicked(true)}>
              ADD Entry
            </Paper>
          )}
        </Paper>
        <Box
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Food Entry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can add foods with associated calorie value and other
            informations.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          bgcolor: "#f5d0f7",
        }}
      >
        <Box
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Food Entry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can add foods with associated calorie value and other
            informations.
          </Typography>
          <MealEntryCount MealDescription={tempList} />
        </Box>

        <Paper
          elevation={10}
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
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

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          bgcolor: "#f5d0f7",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          <MealAddButton
            foodEntries={foodEntriesPerEmail}
            mealRows={mealRows}
            mutateFoodPerEmail={mutateFoodPerEmail}
            nextNewId={nextNewId}
          />
        </Paper>

        <Box
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Add Pre-defined Meal as Food Entries
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can add foods with associated calorie value and other
            informations.
          </Typography>
          <MealEntryCount MealDescription={tempList} />
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          bgcolor: "#f5d0f7",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            flex: 7,
            margin: "20px",
            padding: "20px",
          }}
        >
          <FoodEntryList foodEntries={foodEntriesPerEmail} />
        </Paper>
        <Box
          sx={{
            flex: 3,
            margin: "20px",
            padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Your Food Entries
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can see all of your added food entries.
          </Typography>
        </Box>
      </Box>
<Box>
      
    </Box>
    </Box>
  );
};

export default UserEntry;
