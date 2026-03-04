# メモアプリ

シンプルなメモ管理アプリケーション。カテゴリ分類とフィルタリング機能を備え、ブラウザの localStorage にデータを保存します。

## 主な機能

- メモの作成・編集・削除
- カテゴリ分類（仕事 / 個人 / アイデア）
- カテゴリによるフィルタリング
- localStorage によるデータ永続化
- キーボードショートカット（Enter で追加、Escape で編集キャンセル）

## 技術スタック

- React 19
- Vite 7
- ESLint 9

## セットアップ

```bash
npm install
```

## 起動方法

```bash
# 開発サーバー起動（http://localhost:5173）
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# Lint チェック
npm run lint
```
