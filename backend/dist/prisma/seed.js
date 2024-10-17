"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Lesson データの初期投入
    const lessons = await prisma.lesson.createMany({
        data: [
            { name: "国語" },
            { name: "数学" },
            { name: "理科" },
            { name: "社会" },
            { name: "英語" },
        ],
    });
    console.log("Inserted lessons:", lessons);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
