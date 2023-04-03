<template>
  {{ prelinktext }}<em class="em"
    :style="`background: linear-gradient(transparent 50%, ${$vuetify.theme.current.colors.accent} 50%);`">
    <andml-inline-spanc :props="linktext" />
  </em>{{ postlinktext }}
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const linktext = ref(Props.props)
const prelinktext = ref("")
const postlinktext = ref("")

const notEmWords = ["。", "、"]
for (let w of notEmWords) {
  if (Props.props.endsWith(w)) {
    linktext.value = Props.props.replace(new RegExp(`${w}$`), "")
    postlinktext.value = w
  }
}

const kakomiWords = [["「", "」"]]
for (let w of kakomiWords) {
  if (Props.props.startsWith(w[0]) && Props.props.endsWith(w[1])) {
    linktext.value = Props.props.replace(new RegExp(`^${w[0]}(.*)${w[1]}$`), "$1")
    prelinktext.value = w[0]
    postlinktext.value = w[1]
  }
}

</script>

<style scoped lang="scss">
em.em {
  font-style: normal;
  font-weight: bold;
}
</style>