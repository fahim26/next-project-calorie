import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {

  if(req.method !== "GET"){
    return res.status(405).json({message: "Method dis-allowed"});
  }
  
  try{
    const foodEntries = await prisma.FoodEntry.findMany({
      orderBy:[
        {
          id:'desc',
        },
      ],
    });
    res.status(200).json(foodEntries);
  }catch(e){
    res.status(500).json({message:"Something went wrong"});
  }

};
