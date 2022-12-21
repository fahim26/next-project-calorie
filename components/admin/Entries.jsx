import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const Entries = () => {
  const {
    data: foodWithCount,
    error,
    mutate,
  } = useSWR("/api/entryList", fetcher);
  let foodEntries;
  let week1count;
  let week2count;
  let nextNewId;
  if (foodWithCount) {
    foodEntries = foodWithCount[0];
    week1count = foodWithCount[1];
    week2count = foodWithCount[2];

    nextNewId =
      foodEntries?.length !== 0
        ? Math.max(...foodEntries?.map((o) => o.id)) + 1
        : 1;


  }
  console.log(
    " ------------------------------------------------------- Entries:",
    foodEntries,
    " ++++++++++ ",
    foodWithCount
  );
  return {
    foodRows: foodEntries,
    isLoading: !error && !foodWithCount,
    isError: error,
    mutateEntry: mutate,
    week1count: week1count,
    week2count: week2count,
    nextNewId: nextNewId,

  };
};

export default Entries;
