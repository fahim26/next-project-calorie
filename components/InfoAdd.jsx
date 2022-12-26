import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import {
  Button,
  TextField,
  Stack,
  Paper,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import * as yup from "yup";
import { show_time } from "../Func Folder/dateTimeModification";
import { MealsList } from "../Func Folder/MealsList";
import FoodEntryList from "./FoodEntryList";
import { useEffect, useState } from "react";
import MealDataGridForUser from "./MealDataGridForUser";
import MealsApiCall from "./admin/MealsApiCall";
import EntryListAdmin from "./admin/EntryListAdmin";
import { motion } from "framer-motion";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const Entryschema = yup.object().shape({
  foodName: yup
    .string()
    .typeError(
      "Food Name must contain only letters. No number or Special Character"
    )
    .required("Food Name must be a string")
    .matches(/^[a-zA-Z\s]*$/, "Don't look like a valid food name !!"),
  calorieValue: yup
    .number()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  Meal: yup
    .string()
    .required("Enter Meal")
    .matches(
      /^((Select Meal(?!$)).+|(?!Select Meal).+)$/,
      "Select From Menu According to Max Number"
    ),
});

const InfoAdd = (props) => {
  // const {
  //   data: foodEntries,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useSWR(
  //   sessionUser ? ["/api/entriesPerEmail", sessionUser.email] : null,
  //   fetcherForUserInfo
  // );

  console.log("---------- Info Add ----------");

  // const { mealRows, isLoadingMeal, mutateMeal } = MealsApiCall({sessionEmail:sessionUser.email});
  // const { data:mealRows, isLoadingMeal,errorMealPerEmail,mutate:mutateMeal } = useSWR( ["/api/mealEntryList", sessionUser.email], fetcherForUserInfo);
  // console.log(" ************** _+      yyyyyyyyyyyyyyyyyyyyyyy       _____+_+_+++++++++++ Meal Rows:",mealRows);
  // const [inputtedMeal, setInputtedMeal] = useState(props.MealDescription);
  const [entryButtonClicked, setEntryButtonClicked] = useState(false);

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  // let mutateFoodPerEmail = props.mutateFoodPerEmail;
  let foodEntries = props.foodEntries;
  let MealDescription = props.MealDescription;

  console.log(
    "//////// ++++++++++++++ ///////////// 0000000000000000000 ================= :",
    MealDescription
  );

  const saveFoodEntry = async (new_data) => {
    // console.log(" @@@-----#############---------###############--", new_data);
    console.log(
      "-=-=-=-=-=-=-=- (((((((((((((((((((((((())))))))))))))))))))))))=--=--------=-=-----",
      new_data
    );
    await props.mutateFoodPerEmail(
      async (foodEntries) => {
        let { id, ...dataWithoutId } = new_data;
        const updatedTodo = await fetch("/api/userFoodEntry", {
          method: "POST",
          body: JSON.stringify(dataWithoutId),
        });

        const addedRow = await updatedTodo.json();
        // console.log("%%%%%%%%%%%    $$$$$$$$$$$$$$     ******* : ", addedRow);
        return [...foodEntries, addedRow];
      },

      { revalidate: true }
    );

    // setMealDescription(tempList);

    setSnackbar({
      children: "Entry successfully saved",
      severity: "success",
    });
    // setInputtedMeal("");
  };

  const onSubmit = (newdata) => {
    const { takenAt, ...restData } = newdata;
    const { mealName, ...exceptMeal } = restData;

    const timeUnix = new Date(String(takenAt));
    const UpdatedTime = timeUnix.getTime() / 1000;
    const dataWithUpdatedTime = { ...restData, takenAt: UpdatedTime };

    let sessionUser = props.sessionUser;
    let new_data = {
      id: "",
      userEmail: sessionUser.email,
      // takenAt: d,

      ...dataWithUpdatedTime,
    };

    saveFoodEntry(new_data);
    // setInputtedMeal("Select Meal");
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Entryschema),
  });
  const dd = new Date();
  const dm = show_time();
  // console.log(
  //   "-=-=-=-=-=-=-=- (((((((((((((((((((((((())))))))))))))))))))))))=--=--------=-=-----",
  //   dm
  // );
  const val = {
    curr: dm,
  };

  return (
    <Box>
      <Box
        sx={{
          display:'flex',
          // justifyContent: "space-evenly",
          
        }}
      >
        {/* {entryButtonClicked === true ?  */}
          <Paper
            elevation={3}
            sx={{
              width: '70%',
              height: '70%',
              padding: '10px',
              margin: 'auto',
            }}
            // component={motion.div}
            // whileHover={{ scale: 1.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-error-helper-text"
                  label={errors.foodName?.message}
                  defaultValue="Food"
                  {...register("foodName")}
                  sx={{
                    width: "65%",
                    marginTop: "40px",
                  }}
                />

                <TextField
                  id="outlined-error-helper-text"
                  label={errors.calorieValue?.message}
                  defaultValue="20"
                  {...register("calorieValue")}
                  sx={{
                    width: "65%",
                    marginTop: "20px",
                  }}
                />
                <TextField
                  id="outlined-error-helper-text"
                  label={errors.takenAt?.message}
                  defaultValue={val.curr}
                  type="datetime-local"
                  {...register("takenAt")}
                  sx={{
                    width: "65%",
                    marginTop: "20px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-error-helper-text"
                  select
                  defaultValue="Select Meal"
                  label={errors.Meal?.message}
                  SelectProps={{
                    renderValue: (value) => {
                      for (let i = 0; i < 3; i++) {
                        // console.log(
                        //   "(((((((((((((((((((((((())))))))))))))))))))) : ",
                        //   value
                        // );
                        if (value === "Select Meal") {
                          return "Select Meal";
                        }
                        if (value === MealDescription[i].mealName) {
                          if (
                            MealDescription[i].currEntry >=
                            MealDescription[i].maxEntry
                          ) {
                            return "Select Meal";
                          } else {
                            return value;
                          }
                        }
                      }
                    },
                  }}
                  {...register("Meal")}
                  sx={{
                    width: "65%",
                    marginTop: "20px",
                  }}
                >
                  {MealDescription?.map((item) => {
                    return (
                      <MenuItem key={item.mealID} value={item.mealName}>
                        {item.mealName}
                      </MenuItem>
                    );
                  })}
                </TextField>

                <Button
                  variant="contained"
                  type="submit"
                >
                  submit
                </Button>
              </Stack>
            </form>
          </Paper>
         {/* :  */}
          {/* <Button onClick={() => setEntryButtonClicked(true)}> ADD ENTRY </Button> */}
        {/* } */}
      </Box>
      <Box>

        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={700}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default InfoAdd;
