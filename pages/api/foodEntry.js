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
      await prisma.FoodEntry.create({ data });
      res.status(200).json({ message: "Successfully created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
