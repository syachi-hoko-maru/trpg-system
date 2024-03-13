<template>
  <Card class="bg-white my-5" nobefore>
    <template #tbefore>
      <ItemImg :src="src ? `/other/walker/${src}.webp` : ''" :alt="alt" />
      <div
        class="camera-title d-flex justify-space-between align-start mt-3 mb-1 mx-3"
      >
        <div class="d-flex">
          <VIcon icon="mdi-camera" size="x-large" class="mt-1" />
          <div class="title mx-2">
            <h4 class="mt-1">
              {{ getStr(title) }}
            </h4>
            <h6 class="mt-0">
              {{ getStr(area) }}
            </h6>
          </div>
        </div>
        <div class="mt-1">
          <ItemShare
            text="ライのハーヴェスWALKER"
            url="https://trpg.syachi.work/sw25/data/walker"
            icon
            size="large"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  props: string;
}
const Props = defineProps<Props>();

const [src, title, area] = Props.props.split(",") as (string | undefined)[];
const getStr = (s: string | undefined): string => {
  if (s) return s?.replace(/¥s/g, " ");
  else return "";
};
const alt = `${getStr(area)}で撮影された写真「${getStr(title)}」`;
</script>

<style lang="scss" scoped>
div.camera-title {
  font-size: 1.2rem;
  color: #444;
  div.title {
    h4 {
      font-size: 1.2rem;
      width: 100%;
    }
    h6 {
      font-size: 0.7rem;
      color: #666;
    }
  }
}
</style>
