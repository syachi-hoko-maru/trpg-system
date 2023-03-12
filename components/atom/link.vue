<template>
  <nuxt-link @click.stop="link" :class="`${colorClass} text-decoration-none user-select-none ${disabled?'':'pointer'}`">
    <span :class="decoClass">
      <slot />
    </span>
    <v-icon v-if="!Props.disabled && !Props.button && externalFlag" icon="mdi-open-in-new" size="x-small" />
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  to: string
  disabled?: boolean
  color?: string
  deco?: boolean
  button?: boolean
}
const Props = defineProps<Props>();

const externalFlag = Props.to.startsWith("http") ? true : false

const router = useRouter()
const { closeDialogo } = useDialogo()
const { getNowPage } = usePages()

const link = () => {
  if (Props.disabled || Props.to === "action") return
  else if (externalFlag) {
    window.open(Props.to, '_blank')
  } else if (getNowPage() !== Props.to) {
    router.push(Props.to)
    closeDialogo()
  }
}

let colorClass: string = "text-text"
if (Props.disabled) colorClass = "text-disabled"
else if (Props.color) colorClass = Props.color

let decoClass: string = "text-decoration-none"
if (Props.deco) decoClass = "text-decoration-underline"

</script>

<style scoped>
.user-select-none {
  user-select: none;
}

.pointer {
  cursor: pointer;
}
</style>

