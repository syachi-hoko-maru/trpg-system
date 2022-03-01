<template lang="pug">
SyachiCard(title="支援のお願い")
  p 私しゃちほこ丸はTRPGシステムの開発やシナリオなどの公開、セッションの開催をしております。
  p もし活動を支援していただける場合、以下のメールアドレスまでAmazonギフトカードを送ってくだされば幸いです。
  p シナリオの立ち絵素材の外注などに使わせていただきます。
  p syachi.hoko.trpg〜gmail.com
  p スパム対策をしております。〜を@に変換してください。
  Botton(url="https://www.amazon.co.jp/dp/B004N3APGO", text="Amazonギフトカードを購入")
</template>


<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";

export default Vue.extend({
  components: { SyachiCard },
});
</script>
