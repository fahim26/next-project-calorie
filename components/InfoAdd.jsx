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
  const [inputtedMeal, setInputtedMeal] = useState(props.MealDescription);
  // let MealDescription = [
  //   { mealName: "Breakfast", currEntry: 0, maxEntry: 5 },
  //   { mealName: "Lunch", currEntry: 0, maxEntry: 3 },
  //   { mealName: "Supper", currEntry: 0, maxEntry: 2 },
  // ];
  // const [foodEntriesPerEmail,setFoodEntriesPerEmail] = useState(props.foodEntries);


  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  // let mutateFoodPerEmail = props.mutateFoodPerEmail;
  let foodEntries = props.foodEntries;
  let MealDescription = props.MealDescription;

  console.log("//////// ++++++++++++++ ///////////// 0000000000000000000 ================= :",MealDescription);
  // const timeUnix = new Date();
  // const todayUnix = timeUnix.getTime();
  // const yesterdayUnix = timeUnix.getTime() / 1000 - 24 * 3600;

  // useEffect(() => {
    // foodEntries?.map((item) => {
    //   for (let i = 0; i < 3; i++) {
    //     if (
    //       item.Meal === MealDescription[i].mealName &&
    //       item.takenAt >= yesterdayUnix &&
    //       item.takenAt <= todayUnix
    //     ) {
    //       // let MealElement = MealDescription[i];
    //       // let {currEntry, ...restMealElement} = MealElement;
    //       // MealDescription[i].currEntry++;
    //       setMealDescription((prev) => prev[i].currEntry+1);
    //     }
    //   }
    // });

    // setMealDescription(
    //   foodEntries?.map((item) => {
    //     item.Meal === item.mealName &&
    //     item.takenAt >= yesterdayUnix &&
    //     item.takenAt <= todayUnix
    //       ? { ...item, currEntry: item.currEntry + 1 }
    //       : { ...item };
    //   })
    // );
    // setMealDescription(
    //   MealDescription?.map((mealItem) => {
    //     return props?.foodEntries.map((item) => {
    //       mealItem.Meal === item.mealName &&
    //       item.takenAt >= yesterdayUnix &&
    //       item.takenAt <= todayUnix
    //         ? { ...mealItem, currEntry: mealItem.currEntry + 1 }
    //         : { ...mealItem };
    //     });
    //   })
    // );

    // let tempList = [];
    // let brkfst = props?.foodEntries.filter((item) => item.Meal==="Breakfast" && item.takenAt >= yesterdayUnix &&
    // item.takenAt <= todayUnix).length;  
    // let lunch = props?.foodEntries.filter((item) => item.Meal==="Lunch" && item.takenAt >= yesterdayUnix &&
    // item.takenAt <= todayUnix).length;  
    // let supper = props?.foodEntries.filter((item) => item.Meal==="Supper" && item.takenAt >= yesterdayUnix &&
    // item.takenAt <= todayUnix).length;  
    
    // tempList = MealDescription?.filter((mealItem) => {
    //   let {mealName, ...rest} = mealItem;
    //   let {currEntry, ...restMealDescription} = mealItem;
    //   if(mealName === "Breakfast")
    //   return {...restMealDescription,currEntry: brkfst};

    //   if(mealName === "Lunch")
    //   return {...restMealDescription,currEntry: lunch};
      
    //   if(mealName === "Supper")
    //   return {...restMealDescription,currEntry: supper};
    // })

    // setMealDescription(tempList);

    // console.log("//////// ++++++++++++++ ///////////// 0000000000000000000 ================= :",tempList ,brkfst,lunch,supper);      
  // });
  
  // props.foodEntries?.map((item) => {
  //   for (let i = 0; i < 3; i++) {
  //     if (
  //       item.Meal === MealDescription[i].mealName &&
  //       item.takenAt >= yesterdayUnix &&
  //       item.takenAt <= todayUnix
  //     ) {
  //       MealDescription[i].currEntry++;
  //     }
  //   }
  // });

  const saveFoodEntry = async (new_data) => {
    // console.log(" @@@-----#############---------###############--", new_data);

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
    // console.log(
    //   "^^^^^^^^^ ______________ --------------- &&&&&&&&& :",
    //   takenAt,
    //   "____ ",
    //   dataWithUpdatedTime
    // );
    // const d = moment(takenAt).format("MMM d, YYYY h:mma");
    // console.log("date------------>:",d);
    let sessionUser = props.sessionUser;
    let new_data = {
      id: "",
      userEmail: sessionUser.email,
      // takenAt: d,

      ...dataWithUpdatedTime,
    };
    // console.log("+++++++++++++++ ++++++++++++++ :", new_data);
    // mutate([...foodEntries, new_data], false);

    // reset({Meal:"Select Meal"});
    for (let i = 0; i < 3; i++) {
      if (new_data.Meal === MealDescription[i].mealName) {
        if (MealDescription[i].currEntry >= MealDescription[i].maxEntry) {
          reset({ Meal: "Select Meal" });
          setSnackbar({ children: "Max Limit Exceed", severity: "error" });
        } else {
          saveFoodEntry(new_data);
        }
      }
    }

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
          // display:'flex',
          justifyContent: "space-evenly",
          bgcolor: "yellow",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 600,
            height: 400,
          }}
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
                {
                  
                  MealDescription?.map((item) => {
                    let flag = false;
                    console.log("//////// ++++++++++++++ ///////////// ================= :" ,item);
                    if (
                      item.currEntry >= item.maxEntry
                    ) {
                      flag = true;
                    } else {
                      flag =  false;
                    }
                    return (
                      <MenuItem
                        disabled={flag}
                        key={item.mealID}
                        value={item.mealName}
                      >
                        {item.mealName}
                      </MenuItem>
                    );
                  })
                }
                {/* {MealsList.map((option) => {
                  let d = false;
                  // const filteredMealEntries = foodEntries.filter((entry) => {
                  //   if(entry.Meal === valu){

                  //   }
                  // });

                  // for (let i = 0; i < 3; i++) {
                  //   if (option.label === MealDescription[i].mealName) {
                  //     if (
                  //       MealDescription[i].currEntry >=
                  //       MealDescription[i].maxEntry
                  //     ) {
                  //       d = true;
                  //     }
                  //   }
                  // }

                  d = MealDescription?.map((item) => {
                    if (
                      option.label === item.mealName &&
                      item.currEntry >= item.maxEntry
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  });

                  return (
                    <MenuItem
                      disabled={d}
                      key={option.value}
                      value={option.label}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })} */}
              </TextField>

              <Button variant="contained" type="submit">
                submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
      <Box>
        {/* <Paper>
          {MealDescription.map((item) => {
            return (
              <p>
                {item.mealName} : {item.currEntry} : {item.maxEntry}
              </p>
            );
          })}
        </Paper> */}
        {/* <Paper>
          <FoodEntryList foodEntries={foodEntries} />
        </Paper> */}
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
