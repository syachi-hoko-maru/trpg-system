<template>
  <v-footer absolute app class="bg-secondary d-block" id="footer" :class="fixed ? 'fixed' : ''">
    <div class="my-5" v-if="!error">
      <div class="mt-2 mb-4">
        <atom-link color="text-textbp" to="/setting" title="設定ページへのリンク（フッター）">
          <v-icon icon="mdi-wrench" size="small" class="px-3" />
          設定
        </atom-link>
      </div>
      <div class="py-2" v-for="item of footerItemList" :key="item.to">
        <atom-link color="text-textbp" :to="item.to" :title="`ページ「${item.title}」へのリンク（フッター）`">{{ item.title }}</atom-link>
      </div>
    </div>
    <div class="mt-5 mb-3">
      <span class="text-textbp">
        &copy; {{ nowDate().getFullYear() }} {{ $templateText.name }} <andml-inline-twitter color="text-textbp" />
      </span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { nowDate } from '~/src/util/date';

interface Props {
  error?: boolean
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()
const { fixed } = useDialogo()

const footerItemList = [
  { to: "/search", title: "ページ一覧・検索" },
  { to: "/policy", title: "サイトポリシー" },
  { to: "/me/contact", title: "コンタクト" },
  { to: "https://giftee.com/u/syachi_hoko_trp", title: "欲しいものリスト（giftee）" },
]
</script>

<style lang="scss" scoped>
#footer {
  width: 100vw;

  &.fixed {
    z-index: -1 !important;
  }
}
</style>