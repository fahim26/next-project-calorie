import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { show_time } from "../Func Folder/dateTimeModification";

const SignupSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Required"),
  foodName: Yup.string()
    .typeError(
      "Food Name must contain only letters. No number or Special Character"
    )
    .required("Food Name must be a string")
    .matches(/^[a-zA-Z\s]*$/, "Don't look like a valid food name !!"),
  calorieValue: Yup.number()
    .typeError("Calorie Value must be a number")
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value > 0
    ),
  takenAt: Yup.string().required("Food Name must be a string"),
  Meal: Yup.string()
    .required("Enter Meal")
    .matches(
      /^((Select Meal(?!$)).+|(?!Select Meal).+)$/,
      "Select From Menu According to Max Number"
    ),
});

// const FoodAddForm = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// const MobileBox = styled(Box) (({theme})=> ({
//     display: "flex",
//     justifyContent:"space-between",
//     alignItems:"center",
//     gap:"10px",

//   }));

const FormS = styled(Form)(() => ({
  width: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // backgroundColor: "yellow",
  padding: "20px",
}));

// const StyledStack = styled(Container)(({successMsg}) => ({
//   display: "flex",
//   flexDirection: {successMsg === true ? "row" : "column"},
// }));

const StyledContainer = styled.div((props) => ({
  display: "flex",
  width: "70%",
  height: "60px",
  flexDirection: "column",
  alignItems: "center",
}));

const SField = styled(Field)(() => ({
  width: "100%",
  height: "45px",
  border: "1px solid #ccc",
  // backgroundColor: "#f7b2bc",
  // padding: "10px",
  borderRadius: "5px",
}));

const StyledSelectField = styled(Field)(() => ({
  width: "100%",
  height: "45px",
  border: "1px solid #ccc",
  // backgroundColor: "#f7b2bc",
  // padding: "10px",
  borderRadius: "5px",
}));

// const Button = styled.button`
//   width: 300px;
//   height: 35px;
//   background-color: #5995ef;
//   color: #fff;
//   border-radius: 3px;
// `;

const FoodAddForm = (props) => {
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

  const saveFoodEntry = async (dataWithUpdatedTime) => {
    // console.log(" @@@-----#############---------###############--", new_data);
    console.log(
      "-=-=-=-=-=-=-=- (((((((((((((((((((((((())))))))))))))))))))))))=--=--------=-=-----",
      new_data
    );
    let sessionUser = props.sessionUser;
    let new_data = {
      id: "",
      userEmail: sessionUser.email,
      // takenAt: d,

      ...dataWithUpdatedTime,
    };

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

  // const onSubmit = (newdata) => {
  //   const { takenAt, ...restData } = newdata;
  //   const { mealName, ...exceptMeal } = restData;

  //   const timeUnix = new Date(String(takenAt));
  //   const UpdatedTime = timeUnix.getTime() / 1000;
  //   const dataWithUpdatedTime = { ...restData, takenAt: UpdatedTime };

  //   let sessionUser = props.sessionUser;
  //   let new_data = {
  //     id: "",
  //     userEmail: sessionUser.email,
  //     // takenAt: d,

  //     ...dataWithUpdatedTime,
  //   };

  //   saveFoodEntry(new_data);
  //   // setInputtedMeal("Select Meal");
  // };
  const dd = new Date();
  const dm = show_time();
  console.log(
    "-=-=-=-=-=-=-=- (((((((((((((((((((((((())))))))))))))))))))))))=--=--------=-=-----",
    dm
  );
  const val = {
    curr: dm,
  };

  const formik = useFormik({
    initialValues: {
      foodName: "Kola",
      calorieValue: "",
      takenAt: dm,
      Meal: "Select Meal",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(
        "NEW DATAAAAAAAAAAAAA ==========  ++++++++ ====== : ",
        values
      );
      const { takenAt, calorieValue, ...restData } = values;
      let calValueInt = parseInt(calorieValue);
      const { mealName, ...exceptMeal } = restData;

      const timeUnix = new Date(String(takenAt));
      const UpdatedTime = timeUnix.getTime() / 1000;
      const dataWithUpdatedTime = {
        ...restData,
        calorieValue: calValueInt,
        takenAt: UpdatedTime,
      };

      saveFoodEntry(dataWithUpdatedTime);
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <Paper elevation={10} sx={{ 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto", 
      backgroundColor: "#dae6e5" ,
      height: "350px",
      }}>
      <Formik
        initialValues={{
          foodName: "Food Name",
          calorieValue: "Calorie Value",
          takenAt: "",
          Meal: "Select Meal",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(
            "NEW DATAAAAAAAAAAAAA ==========  ++++++++ ====== : ",
            values
          );
          const { takenAt, calorieValue, ...restData } = values;
          let calValueInt = parseInt(calorieValue);
          const { mealName, ...exceptMeal } = restData;

          const timeUnix = new Date(String(takenAt));
          const UpdatedTime = timeUnix.getTime() / 1000;
          const dataWithUpdatedTime = {
            ...restData,
            calorieValue: calValueInt,
            takenAt: UpdatedTime,
          };

          saveFoodEntry(dataWithUpdatedTime);
          resetForm();
        }}
      >
        {({
          isSubmitting,
          submitForm,
          isValid,
          dirty,
          errors,
          touched,
          values,
        }) => (
          <FormS>
            <StyledContainer err={true}>
              <SField
                //   id="outlined-error-helper-text"
                name="foodName"
                //   label={errors.foodName && touched.foodName ? errors.foodName : null}
                //   defaultValue="Food"
              />

              {!errors.foodName && touched.foodName ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.foodName && touched.foodName ? (
                <Typography variant="caption" display="block" gutterBottom>
                  {errors.foodName}
                </Typography>
              ) : null}
            </StyledContainer>

            <StyledContainer err={true}>
              <SField
                //   id="outlined-error-helper-text"
                name="calorieValue"
                //   label={errors.foodName && touched.foodName ? errors.foodName : null}
                //   defaultValue="Food"
              />
              {!errors.calorieValue && touched.calorieValue ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.calorieValue && touched.calorieValue ? (
                <Typography variant="caption" display="block" gutterBottom>
                  {errors.calorieValue}
                </Typography>
              ) : null}
            </StyledContainer>

            <StyledContainer err={true}>
              <SField
                name="takenAt"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {touched.takenAt ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}
            </StyledContainer>
            {/* <SField
              name="Meal"
              select

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
            </SField> */}
            <StyledContainer err={true}>
              <StyledSelectField as="select" name="Meal">
                <option value="Select Meal">(Select Meal)</option>
                {MealDescription &&
                  MealDescription.map((item) => (
                    <option value={item.mealName} style={{ color: "#46eb67" }}>
                      {item.mealName}
                    </option>
                  ))}
              </StyledSelectField>
              {!errors.Meal && touched.Meal ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.Meal && touched.Meal ? (
                <Typography variant="caption" display="block" gutterBottom>
                  {errors.Meal}
                </Typography>
              ) : null}
            </StyledContainer>

            <Button
              type="button"
              onClick={submitForm}
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              fluidsize="large"
              // color="#46eb67"
              // content="Submit"
            >
              ADD
            </Button>
          </FormS>
        )}
      </Formik>
    </Paper>
  );
};
export default FoodAddForm;
