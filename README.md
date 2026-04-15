# Postman MVP仕様

## 技術スタック
- フロント：Next.js（Vercel）
- DB：Supabase（PostgreSQL）

## URL設計（今回）
- `/amechi_afi_2ndAnniversary`              → 投稿フォーム
- `/amechi_afi_2ndAnniversary/confirm`      → 確認画面
- `/amechi_afi_2ndAnniversary/letter`       → 贈る相手用
- `/amechi_afi_2ndAnniversary/letter/admin` → 管理者用
※ 後から `/[project]` で汎用化する

## テーブル設計
```
messages
- id
- name
- message
- editor_note（null許容）
- created_at
```

## 画面仕様

### ① 投稿フォーム
- 名前・メッセージ・編集者への希望（任意）
- 確認画面へ → 送信

### ② 確認画面
- 入力内容の確認
- 送信 or 戻る

### ③ レター表示（/letter）
- カード一覧形式
- editor_noteは非表示
- URLを贈る相手に手動で渡す

### ④ 管理者用（/letter/admin）
- カード一覧形式
- editor_noteも表示
- 映さなくするメッセージも管理(荒らし対策)