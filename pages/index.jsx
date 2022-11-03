import { Box, Container, TextField } from "@mui/material";
import InfoAdd from "../components/InfoAdd"
import FoodEntryList from "../components/foodEntryList";
import { PrismaClient } from "@prisma/client";
import { ObjectSchema } from "yup";
import axios from "axios";
import useSWR, { useSWRConfig } from 'swr'
import { useEffect, useState } from "react";

const fetcher = (url) => axios.get(url).then((response) => response.data);

// const prisma = new PrismaClient();


// export async function getServerSideProps() {
//   console.log(" ********************************** ");
//   const foodEntries = await prisma.FoodEntry.findMany();
//   console.log("__________ success _____________");
//   console.log(foodEntries);
//   return {
//     props: {
//       foodEntries: foodEntries.map((data) => ({
//         id: data.id,
//         name: data.name,
//         calorieValue: data.calorieValue,
//         takenAt: data.takenAt,
//       })),
//     },
//   };
// }






export default function Home() {
  const { mutate } = useSWRConfig()
  const {data:foodEntries,error } = useSWR('/api/entryList',fetcher);

  const saveFoodEntry = async (data) =>{
  try{
    await fetch("/api/foodEntry",{
      method: "POST",
      body: JSON.stringify(data),
    });
    const {data:secondMutate,error} = mutate('/api/entryList');
    console.log("+++++++++++++++++++  Second Mutate +++++++++++");
    console.log(secondMutate);
  }catch(e){
    console.log(e);
  }
  
  };
  
  
  const onSubmit = (data) => {
    // data.preventDefault();
    const {data:firstMutate,error} = mutate('/api/entryList',[...foodEntries,data],false);
    saveFoodEntry(data);
    console.log("+++++++++++++++++++  First Mutate +++++++++++");
    console.log(firstMutate);
    // mutate('/api/entryList');
  };
  

  // const [posts, setPosts] = useState(null);
  // const getPosts = async () => {
  //   const { data } = await axios("/api/entryList");
  //   setPosts(data);
  //   console.log(" ____________ using effect _________");
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getPosts();

  // }, []);
  console.log("????????????????????????");
  console.log(foodEntries);
  return (
    <Box>
      <InfoAdd onSubmit={onSubmit}/>
      {foodEntries?.map((food) => {
        return (
          <div key={food.id}>
            <h2>{food.id} {food.name} {food.calorieValue} {food.takenAt}</h2>
            <hr />
          </div>
        );
      })}
      {/* <FoodEntryList/>  */}
    </Box>
  );
}
