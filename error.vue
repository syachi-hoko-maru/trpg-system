<template>
  <NuxtLayout name="error">
    <card>
      <template #title>
        エラーが発生しました
      </template>
      <item-button @click.stop="() => handleError('top')">
        トップページに戻る
      </item-button>
      <item-button v-if="pageArray && pageArray.length >= 2" @click.stop="() => handleError(pageArray[1])">
        1つ前のページへ戻る
      </item-button>
    </card>
  </NuxtLayout>
</template >

<script setup lang ="ts">
const { pageArray } = usePages()

const { $templateText } = useNuxtApp()


const handleError = (path?: string) => {
  // clearError({ redirect: path && path !== "top" ? path : '/' })
  location.assign($templateText.basePath + (path && path !== "top" ? path : '/'));
  // location.reload()
}

</script>
