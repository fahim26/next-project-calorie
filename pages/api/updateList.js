import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if(req.method !== "PUT"){
    return res.status(405).json({message: "Method dis-allowed"})
  }

  try{
    const data = JSON.parse(req.body);
    await prisma.FoodEntry.update({
        where: {id: data.id},
        data : { ...data },
    });
    res.status(200).json({message: "Successfully created"});
  }catch(e){
    res.status(500).json({message:"Something went wrong"});
  }

};
