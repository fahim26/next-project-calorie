import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const FoodEntriesPerEmail = ( props ) => {
  
  console.log("---------- 9999999999999999999999999999999999999 ------------:", props.sessionEmail);
  
  const {
    data: foodEntriesPerEmail,
    error,
    isLoading,
    mutate: mutateFoodPerEmail,
  } = useSWR(["/api/entriesPerEmail",props.sessionEmail], fetcherForUserInfo);

 
  const timeUnix = new Date();
  const todayUnix = timeUnix.getTime();
  const yesterdayUnix = timeUnix.getTime() / 1000 - 24 * 3600;
  let brkfst;
  let lunch;
  let supper;

  if (foodEntriesPerEmail) {
    brkfst = foodEntriesPerEmail.filter(
      (item) =>
        item.Meal === "Breakfast" &&
        item.takenAt >= yesterdayUnix &&
        item.takenAt <= todayUnix
    ).length;

    lunch = foodEntriesPerEmail.filter(
      (item) =>
        item.Meal === "Lunch" &&
        item.takenAt >= yesterdayUnix &&
        item.takenAt <= todayUnix
    ).length;

    supper = foodEntriesPerEmail.filter(
      (item) =>
        item.Meal === "Supper" &&
        item.takenAt >= yesterdayUnix &&
        item.takenAt <= todayUnix
    ).length;
  }

  return {
    foodEntriesPerEmail: foodEntriesPerEmail,
    isLoading: !error && !foodEntriesPerEmail,
    mutateFoodPerEmail: mutateFoodPerEmail,
    breakfastCount: brkfst,
    lunchCount: lunch,
    supperCount: supper,
  };
};
