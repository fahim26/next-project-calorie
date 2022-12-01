import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {

  if(req.method !== "GET"){
    return res.status(405).json({message: "Method dis-allowed"});
  }
  
  try{
    const foodEntries = await prisma.FoodEntry.groupBy({
        by: ['userEmail'],
        _avg: {
            calorieValue: true,
          }
      });
    let id = 1;
    let result = foodEntries.map(item => {
        const container = {};
        container['id'] = id++;
        container['userEmail'] = item.userEmail;
        container['averageCalorie'] = item._avg.calorieValue;
        
        return container;
    })
    console.log("DDsss:",result);
    res.status(200).json(result);
  }catch(e){
    res.status(500).json({message:"Something went wrong"});
  }

};
