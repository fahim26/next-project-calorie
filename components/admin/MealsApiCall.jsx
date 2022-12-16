import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const MealsApiCall =  ({sessionEmail}) => {
    const { data, error,mutate } = useSWR( ["/api/mealEntryList", sessionEmail], fetcherForUserInfo);
    console.log("---------- 9999999999999999999999999999999999999 ------------:", data);


    return {
      mealRows: data,
      isLoadingMeal: !error && !data,
      isErrorMeal: error,
      mutateMeal: mutate,
    }
  }

