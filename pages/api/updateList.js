import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if(req.method !== "PUT"){
    return res.status(405).json({message: "Method dis-allowed"})
  }

  try{
    const data = JSON.parse(req.body);
    const {calorieValue, ...rest} = data;
    const c = parseInt(calorieValue);
    console.log("0000 :",data);
    const d = await prisma.FoodEntry.update({
        where: {id: data.id},
        data : { ...rest,calorieValue: c},
    });
    res.send(d);
    // res.status(200).json({d,message: "Successfully created"});
  }catch(e){
    res.status(500).json({message:"Something went wrong"});
  }

};
