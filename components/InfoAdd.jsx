import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import useSWR, { useSWRConfig }  from "swr";

import axios from "axios";


import {
  Button,
  Container,
  FormGroup,
  Grid,
  List,
  TextField,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const fetcher = (url) => axios.get(url).then((response) => response.data);

const InfoAdd = ({onSubmit}) => {
  const {data:foodEntries, error,mutate} = useSWR('/api/entryList',fetcher);

  const schema = yup.object().shape({
    name: yup
      .string()
      .typeError("Food Name must contain only letters. No number or Special Character")
      .required("Food Name must be a string")
      .matches(/^[a-zA-Z\s]*$/, "Don,t look like a valid food name !!"),
    calorieValue: yup
      .number()
      .typeError("Calorie must be a number")
      .positive("Calorie must be positive")
      .integer(),
    takenAt: yup
      .string()
      .required("Fill Up Date-Time")
      .matches(
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])):((0[1-9]|1[0-2])([AaPp][Mm]))/,
        "Date-Time must follow the format: YYYY-MM-DD:HHAM/PM"
      ),
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <TextField
            id="outlined-error-helper-text"
            label={errors.name?.message}
            defaultValue="Food"
            // helperText={errors.foodname?.message}
            {...register("name")}
            sx={{
              width: "20%",
              marginTop: "10px",
            }}
          />

          <TextField
            id="outlined-error-helper-text"
            label={errors.calorieValue?.message}
            defaultValue="20"
            // helperText={errors.calorie?.message}
            {...register("calorieValue")}
            sx={{
              width: "20%",
              marginTop: "10px",
            }}
          />
          <TextField
            id="outlined-error-helper-text"
            label={errors.takenAt?.message}
            defaultValue="2022-12-28:10AM"
            // helperText={errors.calorie?.message}
            {...register("takenAt")}
            sx={{
              width: "20%",
              marginTop: "10px",
            }}
          />
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default InfoAdd;

// ##########################################
