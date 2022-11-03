import axios from "axios";
import React from "react";
import useSWR, { mutate, useSWRConfig }  from "swr";

import { PrismaClient } from "@prisma/client";
import { useState,useEffect } from "react";


const fetcher = (url) => axios.get(url).then((response) => response.data);

export default function FoodEntryList() {
  // const { mutate } = useSWRConfig();
  // console.log("****************");
  // const {data,error} = mutate('/api/entryList');
  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(data);

  return (
    <div>
      {data?.map((food) => {
        return (
          <div key={food.id}>
            <h2>{food.id} {food.name} {food.calorieValue} {food.takenAt}</h2>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
