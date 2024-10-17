import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ルーティングの設定
app.use(router);

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
