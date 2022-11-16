import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import {
  Button,
  Container,
  FormGroup,
  Grid,
  List,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
const fetcher = (url) => axios.get(url).then((response) => response.data);
import * as yup from "yup";

export const Entryschema = yup.object().shape({
  foodName: yup
    .string()
    .typeError(
      "Food Name must contain only letters. No number or Special Character"
    )
    .required("Food Name must be a string")
    .matches(/^[a-zA-Z\s]*$/, "Don't look like a valid food name !!"),
  calorieValue: yup
    .string()
    .typeError("Calorie must be a number")
    .required("calorie value must be a number")
    .matches(/^\d*[1-9]+\d*$/, "Must Be Positive Number"),
  takenAt:yup
    .date()
    .typeError("Invalid Date")
    .required(),
});

const InfoAdd = ({ sessionUser }) => {
  const {
    data: foodEntries,
    error,
    mutate,
  } = useSWR("/api/entryList", fetcher);
  const saveFoodEntry = async (new_data) => {
    const { id, ...dataWithoutIndex } = new_data;
    try {
      await fetch("/api/foodEntry", {
        method: "POST",
        body: JSON.stringify(dataWithoutIndex),
      });
      mutate();
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (data) => {
    const { takenAt, ...restData } = data;
    const d = moment(takenAt,"DD/MM/YYYY hh:mm A");
    let new_data = {
      id: "",
      userEmail: sessionUser.email,
      takenAt: String(d._i),
      ...restData,
    };
    mutate([...foodEntries, new_data], false);
    saveFoodEntry(new_data);
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Entryschema),
  });

  return (
    
      <Paper
        elevation={3}
        sx={{
          width: 800,
          height: 400,
          margin: "auto",
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
                width: "50%",
                marginTop: "40px",
              }}
            />

            <TextField
              id="outlined-error-helper-text"
              label={errors.calorieValue?.message}
              defaultValue="20"
              {...register("calorieValue")}
              sx={{
                width: "50%",
                marginTop: "20px",
              }}
            />
            <TextField
              id="outlined-error-helper-text"
              label={errors.takenAt?.message}
              type="datetime-local"
              {...register("takenAt")}
              sx={{
                width: "50%",
                marginTop: "20px",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" type="submit">
              submit
            </Button>
          </Stack>
        </form>
      </Paper>
      
    
  );
};

export default InfoAdd;


