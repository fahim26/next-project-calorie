import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react'

const MealEntryCount = (props) => {
  let MealDescription = props.MealDescription;
    return (
    <Stack>
          {MealDescription.map((item) => {
            return (

              <Typography variant="h7" gutterBottom>
              {/* Meal Name: {item.mealName} | Number of Current Entry:  {item.currEntry} | Number of Max Entry: {item.maxEntry} */}
              {item.mealName} has currently {item.currEntry} entries and can have maximum of {item.maxEntry} entries.
              </Typography>
            );
          })}
    </Stack>
  )
}

export default MealEntryCount
