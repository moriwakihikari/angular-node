import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.lesson.createMany({
    data: [
      { name: "国語" },
      { name: "数学" },
      { name: "理科" },
      { name: "社会" },
      { name: "英語" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
