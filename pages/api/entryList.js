// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  console.log("_________________ INSIDE API CALL ______________");

  if(req.method !== "GET"){
    return res.status(405).json({message: "Method dis-allowed"});
  }
  
  try{
    const foodEntries = await prisma.FoodEntry.findMany();
    console.log(foodEntries);
    res.status(200).json(foodEntries);
  }catch(e){
    console.log("_________  ERROR IN STORING ENTRY LIST_________");
    res.status(500).json({message:"Something went wrong"});
  }

};
