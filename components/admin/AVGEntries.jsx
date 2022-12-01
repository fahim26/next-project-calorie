import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const AVGEntries =  () => {
    const { data, error,mutate } = useSWR("/api/avgCalorie", fetcher);
    console.log(data);
    return {
      avgRows: data,
      isLoadingAvg: !error && !data,
      isErrorAvg: error,
      mutateAvg: mutate,
    }
  }

  export default AVGEntries;