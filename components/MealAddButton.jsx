import { Box, Button, Stack } from '@mui/material'
import React from 'react'

const MealAddButton = (props) => {
    const mutateFoodPerEmail = props.mutateFoodPerEmail;
    const foodEntriesUser = props.foodEntries;
    console.log(" ############## ---------  ",props,props.foodEntries);
    // let new_id = foodEntriesUser?.length !== 0 ? Math.max(...foodEntriesUser?.map((o) => o.id)) + 1 : 1;
    let newOB = [];
    const timeUnix = new Date();
    const UpdatedTime = Math.trunc(timeUnix.getTime() / 1000);

    let breakfastEntries = props?.mealRows.filter((meal)=>{
      let {id,takenAt, ...dataRest} = meal;
      let updatedMealWithCurrentTime = {...dataRest, takenAt: UpdatedTime}
        if(meal.Meal === "Breakfast"){
            // let {id, ...mealDataRest} = meal;
            newOB.push(updatedMealWithCurrentTime);
            return meal;
        }
    });
    console.log(" ??????????????????????? --------- ",newOB);
    let new_id = props.nextNewId;
    const MutatedbreakfastEntries = newOB.map((meal)=>{
        const mutatedBreakfast = {id:new_id, ...meal};
        return mutatedBreakfast;
    });

    const handleClickAddBFast = async () => {

        console.log(" ############## -----?????????----  ",newOB," ---------  ##############  ",breakfastEntries);
        await mutateFoodPerEmail(
            async (MutatedbreakfastEntries) => {
              await fetch("/api/foodEntry", {
                method: "POST",
                body: JSON.stringify(newOB),
              });
              // const addedRow = await updatedTodo.json();
              console.log(" ####### >>>>>>>>>>>>> ", MutatedbreakfastEntries , ">>>>>>>>>>>>>  ####### ");
              // const filteredRows = foodRows.filter(todo => todo.id !== addedRow)
              return [...foodEntriesUser];
            },
            { revalidate: true }
          );


    }
  return (
    <Stack sx={{
        padding: '20px',
        gap: '10px',
    }}>
    <Button onClick={handleClickAddBFast} variant="contained">Add Breakfast</Button>
    <Button variant="contained">Add Lunch</Button>
    <Button variant="contained">Add Supper</Button>
    </Stack>
  )
}

export default MealAddButton