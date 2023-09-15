<template>
  <card class="pt-4" :nobefore="nobefore">
    <template #title>About Me</template>
    <div class="flex">
      <div class="left">
        <item-img :src="icon" class="radius" alt="アイコン" />
      </div>
      <div class="right">
        <p class="my-1">
          しゃちほこ丸と申します。ソード・ワールド2.5でファンタジー世界を冒険するのが大好きです。他にもいろいろなTRPGが好きです。
        </p>
        <p class="my-1">
          ウェブサイト運営やブログは初心者です。ご感想をいただければ幸いです。<br>
          ご意見ご要望もお待ちしております！
        </p>
        <item-button url="https://twitter.com/syachi_hoko_trp" class="bg-twitter" prepend-icon="mdi-twitter">
          しゃちほこ丸のTwitter
        </item-button>
        <item-button url="/me" />
        <item-button url="https://giftee.com/u/syachi_hoko_trp">欲しいものリスト（giftee）</item-button>
      </div>
    </div>

  </card>
</template>

<script setup lang="ts">
interface Props {
  nobefore?: boolean
}
const Props = defineProps<Props>();

const { nowTheme } = useDesign()
const icon = nowTheme.value === "halloween" ? "/icon-image/20231015.webp" : "/icon-image/20221214.webp"
</script>

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