"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // db.ts をインポート
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/", async (req, res) => {
    try {
        const connection = await (0, db_1.default)(); // データベース接続
        console.log("Database connection successful"); // ここで接続成功を確認
        const [rows] = await connection.execute("SELECT name FROM lesson"); // lessonテーブルからnameを取得
        console.log("Lessons retrieved:", rows); // ここでデータの取得確認
        // データをJSON形式で返す
        res.json({ lessons: rows });
    }
    catch (error) {
        console.error("Error retrieving lessons:", error); // エラー内容を出力
        res.status(500).send("Failed to retrieve lessons");
    }
});
