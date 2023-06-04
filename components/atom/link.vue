<template>
  <nuxt-link :to="link" :target="externalFlag ? '_blank' : ''"
    :class="`${colorClass} text-decoration-none user-select-none ${disabled ? '' : 'pointer'}`" :title="title"
    @click="click">
    <span :class="decoClass">
      <slot />
    </span>
    <v-icon v-if="!Props.disabled && !Props.button && externalFlag" icon="mdi-open-in-new" size="x-small"
      class="ml-1 mr-2" />
  </nuxt-link>
</template>

<script setup lang="ts">
import { event } from "vue-gtag";

interface Props {
  to: string
  disabled?: boolean
  color?: string
  deco?: boolean
  button?: boolean
  title: string
  type?: LinkType
}
const Props = defineProps<Props>();

const externalFlag = Props.to.startsWith("http") ? true : false

const link = computed(() =>
  Props.to === 'action' || Props.disabled
    ? ""
    : !Props.to.startsWith("/")
      ? Props.to
      : Props.to.replace(/\?.*$/, "").replace(/#.*$/, "").endsWith("/")
        ? Props.to
        : Props.to.replace(/\?.*$/, "").replace(/#.*$/, "") + "/" + Props.to.replace(/^[^\?#]+([\?#].*)?$/, "$1")
)

let colorClass: string = "text-text"
if (Props.disabled) colorClass = "text-disabled"
else if (Props.color) colorClass = Props.color

let decoClass: string = "text-decoration-none"
if (Props.deco) decoClass = "text-decoration-underline"

const click = () => {
  event("link_click", {
    link: link.value,
    title: Props.title,
    type: Props.type
  })
}

</script>

<style scoped>
.user-select-none {
  user-select: none;
}

.pointer {
  cursor: pointer;
}
</style>

