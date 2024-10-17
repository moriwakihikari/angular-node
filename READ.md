# 環境構築手順

このプロジェクトは、Docker を使用してバックエンドとフロントエンドをセットアップしています。以下の手順に従って、プロジェクトをローカル環境で実行することができます。

## 前提条件

- Docker および Docker Compose がインストールされていること

## 手順

### 1. リポジトリをクローン

まず、リポジトリをクローンします。

```bash
git clone <repository-url>
cd Angular-Node
```

### 2. Docker イメージをビルド

次に、Docker Compose を使用してバックエンドとフロントエンドのイメージをビルドします。

```
docker-compose build
```

### 3. コンテナを起動

```
docker-compose up -d
```

### 4. Prisma のマイグレーションを実行

データベーススキーマのマイグレーションを適用するために、以下のコマンドを実行します。

```
docker exec -it angular-node-backend-1 npx prisma migrate deploy
```

### 5. 初期データのシード

授業テーブルなどの初期データをデータベースに挿入するために、シードスクリプトを実行します。

```
docker exec -it angular-node-backend-1 npm run seed
```

### 6. アプリケーションのアクセス

- フロントエンド: http://localhost:4200
- バックエンド API: http://localhost:3000

### 7. コンテナの停止

```
docker-compose down
```
