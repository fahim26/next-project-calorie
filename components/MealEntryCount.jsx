import { Paper } from '@mui/material';
import React from 'react'

const MealEntryCount = (props) => {
  let MealDescription = props.MealDescription;
    return (
    <Paper>
          {MealDescription.map((item) => {
            return (
              <p>
                {item.mealName} : {item.currEntry} : {item.maxEntry}
              </p>
            );
          })}
    </Paper>
  )
}

export default MealEntryCount
