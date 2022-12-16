import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const Entries =  () => {
    const { data, error,mutate } = useSWR("/api/entryList", fetcher);
    return {
      foodRows: data,
      isLoading: !error && !data,
      isError: error,
      mutateEntry: mutate,
    }
  }

  export default Entries;

