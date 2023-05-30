<template>
  <card class="pt-4">
    <!-- <template #title>このウェブサイトの管理人</template> -->
    <div class="flex">
      <div class="left">
        <item-img :src="`${$templateText.basePath}/webp/icon-image/20250101.webp`" class="radius" alt="アイコン" />
      </div>
      <div class="right">
        <p class="my-1">
          しゃちほこ丸と申します。ソード・ワールド2.5でファンタジー世界を冒険するのが大好きです。他にもいろいろなTRPGが好きです。
        </p>
        <p class="my-1">
          ウェブサイト運営やブログは初心者です。ご意見ご要望をお待ちしております！
        </p>
        <item-button url="https://twitter.com/syachi_hoko_trp" color="blue">Twitter</item-button>
        <item-button url="/me" normal-button>プロフィールページ</item-button>
      </div>
    </div>

  </card>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  .left {
    width: 33%;
    min-width: 200px;
    max-width: 250px;
    padding: 1rem;

    .radius {
      border-radius: 50%;
    }
  }

  .right {
    width: 67%;
    flex-grow: 1;
    flex-shrink: 2;
  }
}
</style>