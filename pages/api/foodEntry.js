// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if(req.method !== "POST"){
    return res.status(405).json({message: "Method dis-allowed"})
  }

  try{
    const data = JSON.parse(req.body);
    console.log(data);
    await prisma.FoodEntry.create({data});
    res.status(200).json({message: "Successfully created"});
  }catch(e){
    console.log("_________  ERROR IN STORING FOOD ENTRY _________");
    console.log(e);
    res.status(500).json({message:"Something went wrong"});
  }

};
