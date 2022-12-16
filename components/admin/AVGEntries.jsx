import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const AVGEntries =  (foodRows) => {
  console.log("___________ AVERAGE API _____________ :",foodRows);
    const { data, error,mutate } = useSWR(foodRows ? "/api/avgCalorie" : null, fetcher);
console.log(" AVG DATA OUTPUT ------------------------- :",data);
    return {
      avgRows: data,
      isLoadingAvg: !error && !data,
      isErrorAvg: error,
      mutateAvg: mutate,
    }
  }

  export default AVGEntries;