import { Box, Button, Card, CardActionArea, CardContent, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const MealAddButton = (props) => {
  const mutateFoodPerEmail = props.mutateFoodPerEmail;
  const foodEntriesUser = props.foodEntries;
  console.log(" ############## ---------  ", props, props.foodEntries);
  // let new_id = foodEntriesUser?.length !== 0 ? Math.max(...foodEntriesUser?.map((o) => o.id)) + 1 : 1;

  const timeUnix = new Date();
  const UpdatedTime = Math.trunc(timeUnix.getTime() / 1000);

  const mealRows = props?.mealRows;

  const handleClickAddBFast = (value, mealRows) => async () => {
    let newOB = [];
    let breakfastEntries = mealRows.filter((meal) => {
      let { id, takenAt, ...dataRest } = meal;
      let updatedMealWithCurrentTime = { ...dataRest, takenAt: UpdatedTime };
      if (meal.Meal === value) {
        // let {id, ...mealDataRest} = meal;
        newOB.push(updatedMealWithCurrentTime);
        return meal;
      }
    });
    console.log(" ??????????????????????? --------- ", newOB, value, mealRows);
    let new_id = props.nextNewId;
    const MutatedbreakfastEntries = newOB.map((meal) => {
      const mutatedBreakfast = { id: new_id, ...meal };
      return mutatedBreakfast;
    });

    console.log(
      " ############## -----?????????----  ",
      newOB,
      " ---------  ##############  ",
      breakfastEntries
    );
    await mutateFoodPerEmail(
      async (MutatedbreakfastEntries) => {
        await fetch("/api/foodEntry", {
          method: "POST",
          body: JSON.stringify(newOB),
        });
        // const addedRow = await updatedTodo.json();
        console.log(
          " ####### >>>>>>>>>>>>> ",
          MutatedbreakfastEntries,
          ">>>>>>>>>>>>>  ####### "
        );
        // const filteredRows = foodRows.filter(todo => todo.id !== addedRow)
        return [...foodEntriesUser];
      },
      { revalidate: true }
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          width: 200,
          height: 200,
          marginRight: "20px",
          // padding:'20px',
        }}
      >
        <CardActionArea onClick={handleClickAddBFast("Breakfast", mealRows)}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{
                marginTop: "20px",
              }}
            >
              Breakfast
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: 200,
          height: 200,
          marginRight: "20px",
          // padding:'20px',
        }}
      >
        <CardActionArea onClick={handleClickAddBFast("Lunch", mealRows)}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{
                marginTop: "20px",
              }}
            >
              Lunch
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: 200,
          height: 200,
          marginRight: "20px",
          // padding:'20px',
        }}
      >
        <CardActionArea onClick={handleClickAddBFast("Supper", mealRows)}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{
                marginTop: "20px",
              }}
            >
              Supper
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* <Paper
        onClick={handleClickAddBFast("Breakfast", mealRows)}
        variant="contained"
      >
        Add Breakfast
      </Paper>
      <Button
        onClick={handleClickAddBFast("Lunch", mealRows)}
        variant="contained"
      >
        Add Lunch
      </Button>
      <Button
        onClick={handleClickAddBFast("Supper", mealRows)}
        variant="contained"
      >
        Add Supper
      </Button> */}
    </Box>
  );
};

export default MealAddButton;
