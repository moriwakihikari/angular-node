import { Request, Response } from "express";
import prisma from "../db"; // Prismaを使用するためにインポート

export const lessonController = {
  getLessons: async (req: Request, res: Response) => {
    try {
      const lessons = await prisma.lesson.findMany();
      console.log("Lessons retrieved:", lessons);
      res.json({ lessons });
    } catch (error) {
      console.error("Error retrieving lessons:", error);
      res.status(500).send("Failed to retrieve lessons");
    }
  },

  // 一旦any,,,
  createFolder: async (req: Request, res: any) => {
    const { lessonId, folderName } = req.body;

    if (!lessonId || !folderName) {
      return res
        .status(400)
        .json({ error: "lessonIdとfolderNameが必要です。" });
    }

    try {
      const lessonIdInt = parseInt(lessonId, 10);
      const newFolder = await prisma.folder.create({
        data: {
          name: folderName,
          lessons: {
            create: {
              lesson: {
                connect: { id: lessonIdInt },
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
  },

  // 一旦any,,,
  getFolders: async (req: Request, res: any) => {
    const lessonId = parseInt(req.query.lessonId as string, 10);
    if (isNaN(lessonId)) {
      return res.status(400).json({ error: "無効な授業IDです。" });
    }

    try {
      const folders = await prisma.folder.findMany({
        where: {
          lessons: {
            some: {
              lessonId: lessonId,
            },
          },
        },
      });

      res.json(folders);
    } catch (error) {
      console.error("Error retrieving folders:", error);
      res.status(500).json({ error: "フォルダ取得中にエラーが発生しました。" });
    }
  },

  deleteFolder: async (req: Request, res: Response) => {
    const folderId = parseInt(req.params.id);
    try {
      await prisma.lessonFolder.deleteMany({
        where: {
          folderId: folderId,
        },
      });

      const folder = await prisma.folder.delete({
        where: {
          id: folderId,
        },
      });

      res.json(folder);
    } catch (error) {
      console.error("Error deleting folder:", error);
      res.status(500).json({ error: "フォルダ削除中にエラーが発生しました。" });
    }
  },
};
