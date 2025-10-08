# IndieSite

IndieGame Hubは、インディーズゲームを紹介・共有するウェブアプリです。


## 目次

1.[デモ](#デモ)
2.[主な機能](#主な機能)
3.[使用技術](#使用技術)
4.[環境構築](#環境構築)
5.[必要条件](#必要条件)
6.[手順](#手順)


## デモ
本番サイト: [https://indiegame-hub.web.app/](https://indiegame-hub.web.app/)

## 機能
- インディーズゲームのランキング毎日更新
- ゲーム一覧の表示 (人気順・新規順)
- Firebase Authentivationによるログイン
- Firebase Firebase Hosting での公開

## 使用技術
- **フロントエンド**: React, Vite, Chakra UI
- **バックエンド / データベース**: supabase
- **バッチ処理**: Node.js, ts-node
- **CI/CD / 自動化**: GitHub Actions
- **言語**: JavaScript / TypeScript
- **テスト**: Jest, React Testing Library

## 環境構築

### 必要条件
- Node.js 20+
- npm 8+
- Firebase CLI

### 手順
1. リポジトリをクローン
```bash
git clone https://github.com/takaki-inokuchi/IndieSite.git
cd IndieSite
