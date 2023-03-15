<template>
  <v-footer absolute app class="bg-secondary d-block" id="footer">
    <div class="my-5" v-if="!error">
      <div class="my-2">
        <atom-link color="text-textbp" to="/setting">
          <v-icon icon="mdi-wrench" size="small" class="px-3" />
          設定
        </atom-link>
      </div>
      <div class="my-2">
        <atom-link color="text-textbp" to="/policy">サイトポリシー</atom-link>
      </div>
      <div class="my-2">
        <atom-link color="text-textbp" to="/contact">コンタクト</atom-link>
      </div>
    </div>
    <div class="mt-5 mb-3">
      <span class="text-textbp">
        &copy; {{ new Date().getFullYear() }} {{ $templateText.name }} <andml-inline-twitter color="text-textbp" />
      </span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
interface Props {
  error?: boolean
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()
</script>

<style lang="scss" scoped>
#footer {
  width: 100vw;
}
</style>