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
- HTML5
- CSS3
- JavaScript（Node.js/TypeScript）
-- React（PoC・個人開発のみ）
-- Vue/nuxt
--- Vue3/nuxt3
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

&2 作品
&3 当サイト
- 使用技術
-- フロントエンド：TypeScript¥s+¥sNuxt3¥s+¥sGitHub¥sPages
-- デプロイ：GitHub¥sActions
-- バックエンド（CMS）：Google¥sApps¥sScript（現在停止中）
- 工夫点
-- 完全無料デプロイ
-- Google¥sApps¥sScriptとGitHub¥sActionsを使用した独自CMS
--- Google¥sFormの送信時にGoogle¥sApps¥sScriptからGitHub¥sActionsを呼び、自動デプロイを行う
-- 通勤時間にスマホで書きやすいように作成した独自マークアップ言語
&button_https://github.com/syachi-hoko-maru/trpg-system/ GitHub

&1 その他
- Java（個人開発のみ）
-- MinecraftのMOD開発など
- Adobe¥sIllustrator
-- 同人誌の表紙の編集経験あり
- Adobe¥sInDesign（初学者）
- Microsoft¥sOffice

&2 作品
&3 SW2.5同人誌『冒険者の旅路』表紙・裏表紙編集
表紙イラストはたつみ先生
&button_/sw25/feature/c102
`
</script>