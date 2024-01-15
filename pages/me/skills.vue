<template>
    <CardArrayByAndml :andml="andml1" />
</template>

<script setup lang="ts">
const andml1 = `
&1 ウェブ開発
仕様策定・設計・実装・テスト・リリースを担当するウェブエンジニア（開発マネージャー）をしております。
フロントエンド・バックエンドともに開発経験あり。
&br
「やりたいこと」を「仕様」や「実装方針」にする工程が特に好きで、得意であると自負しています。

&3 使用言語・フレームワーク
- HTML5・CSS3
- JavaScript（Node.js/TypeScript）
-- React（PoC・個人開発のみ）
-- Vue/nuxt
-- Angular（PoCのみ）
-- Express（個人開発のみ）
- PHP
-- （独自フレームワーク）
- Python
-- Django（PoCのみ）
-- Flask（個人開発のみ）

&3 DB
- RDB
-- MySQL
-- PostgreSQL（個人開発のみ）
-- Oracle
- NoSQL
-- MongoDB（個人開発のみ）

&3 その他
- Linux
-- 基本コマンド
-- Apache（学習のみ）
-- Nginx（個人開発のみ）
- AWS
-- EC2
-- S3
-- Lambda
- terraform（経験浅）
- GitHub¥sActions
- Google¥sApps¥sScript（個人開発のみ）

&1 その他
- Java（個人開発のみ）
-- MinecraftのMOD開発など
- Adobe¥s illustrator
- Microsoft¥sOffice
`
</script>