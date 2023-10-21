const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Chess" },
        { name: "Photography" },
        { name: "Web Devlopement" },
        { name: "App Devlopement" },
        { name: "IOS Devlopement" },
        { name: "Android Devlopement" },
        { name: "AI & ML" },
      ],
    });
    console.log("Sucess");
  } catch (error) {
    console.log("error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
