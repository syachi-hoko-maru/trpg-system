<template>
  <section class="card-div" :class="nobefore ? '' : 'before'" :id="title">
    <v-card class="my-5" :class="Props.class ? Props.class : 'bg-background text-text'"
      :elevation="elevation ? elevation : $vuetify.theme.current.dark ? 5 : 3">
      <v-row v-if="Props.loading || Props.comingsoon" class="card-cover align-center justify-center">
        <v-progress-circular v-if="Props.loading" :size="70" :width="7" indeterminate color="primary"
          class="card-cover-item" />
        <div v-if="Props.comingsoon" class="comingsoon card-cover-item">Coming Soon</div>
        <div class="background" :style="`background-color: ${$vuetify.theme.current.colors.background};`" />
      </v-row>
      <slot name="tbefore" />
      <div class="px-4" v-if="$slots.ptbefore">
        <slot name="ptbefore" />
      </div>
      <div v-if="$slots.title" class="pt-5 pb-3">
        <div v-if="$slots.usubtitle">
          <slot name="usubtitle" />
        </div>
        <h2 class="head1 px-4 py-0 my-0 card-title" :id="id">
          <slot name="title" />
        </h2>
        <v-card-subtitle v-if="$slots.subtitle">
          <slot name="subtitle" />
        </v-card-subtitle>
        <v-divider class="mt-2" />
      </div>
      <slot name="before" />
      <div class="px-4" v-if="$slots.pbefore">
        <slot name="pbefore" />
      </div>
      <v-card-text v-if="$slots.default" class="pt-1 pb-5">
        <slot name="default" />
      </v-card-text>
      <div class="px-4" v-if="$slots.pafter">
        <slot name="pafter" />
      </div>
      <slot name="after" />
    </v-card>
  </section>
</template>

<script setup lang="ts">
interface Props {
  class?: string
  comingsoon?: boolean
  loading?: boolean
  nobefore?: boolean
  elevation?: number
}
const Props = defineProps<Props>()

const slots = useSlots()
const { setLoad } = useLoad()

const id = ref("")
const title = ref("")

let count = 0

const setTitle = (finish: () => void) => {
  try {
    if (!slots.title) throw 0
    const element = document.getElementById(id.value)
    if (!element) throw 1
    const rowtext = element.textContent
    if (!rowtext) throw 0
    const text = rowtext?.replace(/^\s*([^\s].*[^\s])\s*$/, "$1")
    // console.log(count, text)
    title.value = text
    finish()
  } catch (err) {
    if (err === 0 || count >= 10) {
      finish()
      return
    }
    // console.log("error", count, err, id.value)
    setTimeout(() => setTitle(finish), 0.5 * count * 1000)
    count++
  }
}

onMounted(() => {
  const finish = setLoad()
  id.value = `randId_${String(Math.floor(Math.random() * 10 ** 6))}`
  setTitle(finish)
})
</script>

<style lang="scss" scoped>
.head1 {
  font-size: 1.75em;
  line-height: 1.3em;
  font-weight: normal;
}

.card-cover {
  position: absolute;
  z-index: 1021;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .card-cover-item {
    z-index: 1021;

    &.comingsoon {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  div.background {
    position: absolute;
    z-index: 1020;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 67%;
  }
}

section.card-div[id] {
  &.before::before {
    display: block;
    height: 55px;
    margin-top: -75px;
    content: "";
  }
}
</style>