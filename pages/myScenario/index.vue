<template lang="pug">
div
  SyachiCard(title="シナリオ")
    p 以下が現在公開中・執筆中・計画中のシナリオとなります。
    p これらの最新情報は以下のTwitterで発信しています。
    TwitterLink(yti)
    p シナリオ執筆以外の同人活動プロジェクトについては以下をご覧ください。
    Button(url="/projects", text="現在進行中の同人活動プロジェクト")

  SyachiCard(title="利用にあたって")
    p 改変は、セッションが参加者全員にとって面白くなるとGMが考えるのであれば、自由にしていただいて構いません。<br>
      | 特にPCがシナリオで想定していない行動をした場合にアドリブで解決することは強く推奨します。<br>
      | なお、シナリオ改善のため、どのような改変を行なったか教えていただければ幸いです。
    p また、システムの規約を守る限りにおいて、配信は収益化含めOK、会場代等がかかるオフラインセッションへの利用もOKです。
    p プレイ時間の目安は対面でのセッションか、ボイスセッションの場合を想定したものです。

  SyachiCard(
    v-for="scenario in scenarios.filter((o) => !o.hidden)",
    :key="scenario.title",
    :title="scenario.title",
    :src="scenario.src ? require(`~/assets/projects/${scenario.src}`) : ''"
  )
    p
      span.system {{ scenario.system }}
      br
      span.status {{ scenario.status ? scenario.status : '計画中' }}・
      span.price {{ scenario.price ? `¥${scenario.price}-` : '無料' }}
      br
      template(v-for="special in scenario.specials")
        span.special {{ special }}
        br
    p
      template(v-for="data in scenario.data")
        span.data {{ data }}
        br
    p(v-for="message in scenario.messages", :key="message", v-html="message")
    template(v-for="button in scenario.buttons.filter((o) => o.url)")
      Button(:url="button.url", :text="button.text")
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";

import { scenarios } from "@/assets/scenarios";

export default Vue.extend({
  name: "ScenariosPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
  },
  data: function () {
    return {
      scenarios: scenarios,
    };
  },
});
</script>
