import axios from "axios";
import React, { useState } from "react";

import Entries from "./Entries";
import AVGEntries from "./AVGEntries";
import EntryListAdmin from "./EntryListAdmin";
import { Box } from "@mui/material";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const WrapperComAdmin = () => {
  const { foodRows, isLoading, mutateEntry } = Entries();
  console.log(" ************** Wrapper Food Rows:", foodRows);

  const { avgRows, isLoadingAvg, mutateAvg } = AVGEntries(foodRows);
  console.log(" ************** AVERAGE ENTRIES:", avgRows);
  if (isLoading || isLoadingAvg) {
    return <div>Loading Wrapper</div>;
  }

  return (
    <Box>
      <EntryListAdmin
        foodRows={foodRows[0]}
        avgRows={avgRows}
        mutateEntry={mutateEntry}
        mutateAvg={mutateAvg}
        apiType="admin"
        week1count={foodRows[1]}
        week2count={foodRows[2]}
        
      />
    </Box>
  );
};

export default WrapperComAdmin;
