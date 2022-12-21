import axios from "axios";
import React, { useState } from "react";

import Entries from "./Entries";
import AVGEntries from "./AVGEntries";
import EntryListAdmin from "./EntryListAdmin";
import { Box } from "@mui/material";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const WrapperComAdmin = () => {
  const { foodRows, isLoading, mutateEntry,week1count,week2count } = Entries();
  console.log(" ************** Wrapper Food Rows:", foodRows);

  const { avgRows, isLoadingAvg, mutateAvg } = AVGEntries(foodRows);
  // console.log(" ************** AVERAGE ENTRIES:", avgRows);

  if (isLoading || isLoadingAvg) {
    return <div>Loading Wrapper</div>;
  }

  return (
    <Box>
      <EntryListAdmin
        foodRows={foodRows}
        avgRows={avgRows}
        mutateEntry={mutateEntry}
        mutateAvg={mutateAvg}
        apiType="admin"
        week1count={week1count}
        week2count={week2count}
        
      />
    </Box>
  );
};

export default WrapperComAdmin;
