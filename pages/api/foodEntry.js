import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "PUT") {
    const deleteEntryId = JSON.parse(req.body);
    try {
      const deleteUser = await prisma.FoodEntry.delete({
        where: {
          id: deleteEntryId,
        },
      });
      res.status(200).json({ message: "Successfully Deleted" });
    } catch (e) {
      res.status(500).json({ message: "Delete Failed" });
    }
  }

  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const d = await prisma.FoodEntry.create({ data });
      // console.log("-- %%%% ---- %%%% ---- %%%% ---- %%%% ---- %%%%");
      // console.log(d);
      res.send(d);
      // res.status(200).json({d, message: "Successfully created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
