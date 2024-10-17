import express, { Request, Response } from "express";
import prisma from "./db"; // Prismaを使用するためにインポート
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // JSONパーサーを追加

const PORT = process.env.PORT || 3000;

// GET: lessonを取得するエンドポイント
app.get("/lesson", async (req: Request, res: Response) => {
  try {
    const lessons = await prisma.lesson.findMany();
    console.log("Lessons retrieved:", lessons);
    res.json({ lessons });
  } catch (error) {
    console.error("Error retrieving lessons:", error);
    res.status(500).send("Failed to retrieve lessons");
  }
});

// POST: フォルダを作成し、中間テーブルにも登録する
app.post("/create-folder", async (req: any, res: any) => {
  const { lessonId, folderName } = req.body;

  // lessonIdとfolderNameがリクエストに含まれているか確認
  if (!lessonId || !folderName) {
    return res.status(400).json({ error: "lessonIdとfolderNameが必要です。" });
  }

  try {
    // lessonIdを整数に変換
    const lessonIdInt = parseInt(lessonId, 10);

    // ORM:Prismaを使用
    // フォルダを作成する
    const newFolder = await prisma.folder.create({
      data: {
        name: folderName, // フォルダ名を保存
        lessons: {
          // 中間テーブル (LessonFolder) にもデータを登録する
          create: {
            lesson: {
              connect: { id: lessonIdInt }, // lessonIdに対応するLessonと関連付ける
            },
          },
        },
      },
    });

    console.log("Folder and relation created:", newFolder);
    res.json({
      message: "フォルダと関連データが作成されました",
      folder: newFolder,
    });
  } catch (error) {
    console.error("Error creating folder and relation:", error);
    res.status(500).json({ error: "フォルダ作成中にエラーが発生しました。" });
  }
});

app.get("/folders", async (req: Request, res: Response) => {
  try {
    // フォルダと関連する教科を取得
    const folders = await prisma.folder.findMany({
      include: {
        lessons: {
          include: {
            lesson: true,
          },
        },
      },
    });

    res.json(folders);
  } catch (error) {
    console.error("Error retrieving folders:", error);
    res.status(500).json({ error: "フォルダ取得中にエラーが発生しました。" });
  }
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
