# コーディング規約

## 命名規則

- 変数・関数: camelCase（例: `memoList`, `handleDelete`）
- コンポーネント: PascalCase（例: `MemoItem`, `SearchBar`）
- 定数: UPPER_SNAKE_CASE（例: `STORAGE_KEY`）

## エラーハンドリング

- localStorageの読み書きにはtry-catchを使う
- エラー発生時はconsole.errorでログを出力する

## コンポーネント設計

- 1コンポーネント1責務
- 250行を超えるコンポーネントは分割を検討する
