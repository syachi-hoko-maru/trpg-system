<template>
  <div v-if="show">
    <game-balloons-balloon v-for="i in count" />
  </div>
</template>

<script setup lang="ts">
const { nowPageSetting } = usePages()
const show = ref(false)
const count = ref(20)

const set = () => {
  if (show.value) return
  if (nowPageSetting.value.to === "/me") {
    count.value = 30
  }
  show.value = true
  setTimeout(() => {
    show.value = false
    count.value = 20
  }, 30 * 1000)
}

onMounted(() => {
  set()
  watch(nowPageSetting, () => {
    if (nowPageSetting.value.to === "/me") {
      set()
    }
  })
})
</script>