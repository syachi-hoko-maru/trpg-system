<template>
  {{ preemtext }}<em class="em"
    :style="`background: linear-gradient(transparent 50%, ${$vuetify.theme.current.colors.accent} 50%);`">
    <andml-inline-spanc :props="emtext" />
  </em>{{ postemtext }}
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const emtext = ref(Props.props)
const preemtext = ref("")
const postemtext = ref("")

const notEmWords = ["。", "、"]
for (let w of notEmWords) {
  if (Props.props.endsWith(w)) {
    emtext.value = Props.props.replace(new RegExp(`${w}$`), "")
    postemtext.value = w
  }
}

const kakomiWords = [["「", "」"]]
for (let w of kakomiWords) {
  if (Props.props.startsWith(w[0]) && Props.props.endsWith(w[1])) {
    emtext.value = Props.props.replace(new RegExp(`^${w[0]}(.*)${w[1]}$`), "$1")
    preemtext.value = w[0]
    postemtext.value = w[1]
  }
}

</script>

<style scoped lang="scss">
em.em {
  font-style: normal;
  font-weight: bold;
}
</style>