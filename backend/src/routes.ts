import { Router } from "express";
import { lessonController } from "./controllers/folderController";

const router = Router();

// 授業取得
router.get("/lesson", lessonController.getLessons);
// フォルダ作成
router.post("/create-folder", lessonController.createFolder);
// フォルダ取得
router.get("/folders", lessonController.getFolders);
// フォルダ削除
router.delete("/delete-folder/:id", lessonController.deleteFolder);

export default router;
