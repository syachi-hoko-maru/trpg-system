<template>
  <card @click="click" class="mb-0">
    <template #tbefore>
      <div class="meishi-div" :class="clicked">
        <div class="meishi" :class="omote ? 'front' : 'back'">
          <item-img :src="`${$templateText.basePath}/webp/other/card1.webp`" alt="名刺（表）" width="100%"
            aspect-ratio="91/55" />
        </div>
        <div class="meishi" :class="omote ? 'back' : 'front'">
          <item-img :src="`${$templateText.basePath}/webp/other/card2.webp`" alt="名刺（裏）" width="100%"
            aspect-ratio="91/55" />
        </div>
      </div>
      <p class="ma-1">
        クリックすると表裏が入れ替わります
      </p>
    </template>
  </card>
</template>

<script setup lang="ts">
const omote = ref(false)
const clicked = ref("")

const click = () => {
  if (clicked.value === "clicked") return
  clicked.value = "clicked"
  omote.value = !omote.value
  setTimeout(() => {
    clicked.value = ""
  }, 0.8 * 1000)
}
</script>

<style scoped lang="scss">
.meishi-div {
  width: 100%;
  position: relative;
  cursor: pointer;

  &.clicked {
    cursor: none;
  }

  &::before {
    content: "";
    display: block;
    padding-top: 60.4302%;
  }

  .meishi {
    transition: all 0.8s;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;

    &.front {
      transform: rotateY(-180deg);
    }

    &.back {
      transform: rotateY(0);
    }
  }

}
</style>