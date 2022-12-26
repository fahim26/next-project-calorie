import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const MealsApiCall =  (props) => {
    const { data:mealEntriesPerEmail, error,mutate } = useSWR( ["/api/mealEntryList", props.sessionEmail], fetcherForUserInfo);
    // console.log("---------- 9999999999999999999999999999999999999 ------------:", data);
    const timeUnix = new Date();
    const todayUnix = timeUnix.getTime();
    const yesterdayUnix = timeUnix.getTime() / 1000 - 24 * 3600;
    let brkfst;
    let lunch;
    let supper;
  
    if (mealEntriesPerEmail) {
      brkfst = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Breakfast"
      ).length;
  
      lunch = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Lunch" 
      ).length;
  
      supper = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Supper" 
      ).length;
    }
  

    return {
      mealRows: mealEntriesPerEmail,
      isLoadingMeal: !error && !mealEntriesPerEmail ,
      isErrorMeal: error,
      mutateMeal: mutate,
      breakfastCount: brkfst,
      lunchCount: lunch,
      supperCount: supper,
    }
  }

