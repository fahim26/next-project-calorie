import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method dis-allowed" });
      }
  
    console.log(" ______3-245-234444444423423423423 sdzffff ");
    try {
      console.log("******** ////////////////////////////////////  **********" , req.body);
      const data = JSON.parse(req.body);
      console.log("-- %%%% ---- %%%% ---- %%%% ---- %%%% ---- %%%%",data);
      const d = await prisma.FoodEntry.create({data} );
      
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!! --> ",d);
      res.send(d);
      // res.status(200).json({d, message: "Successfully created" });
    } catch (e) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ :::: ",e);
      res.status(500).json({e, message: "Something went 222222 wrong" });
    }
  
};
