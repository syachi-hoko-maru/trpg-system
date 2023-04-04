<template>
  <card :loading="loading" v-if="index.length && index.length > 1">
    <template #title>
      目次
    </template>
    <div v-for="title, i of index" :key="title" class="index-item-border">
      <atom-link :to="`#${title}`">
        <div class="index-item">
          <span class="circle">
            <span class="number">
              {{ ("00" + (i + 1)).slice(-2) }}
            </span>
          </span>
          <span class="text text-decoration-underline">
            {{ title }}
          </span>
        </div>
      </atom-link>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

interface Props {
  pageSetting: PageSetting
}
const Props = defineProps<Props>();

const loading = ref(true)
const index: Ref<string[]> = ref([])

const { ok } = useLoad();

const setIndex = () => {
  loading.value = true
  index.value = []
  const documents = document.getElementById("page")?.querySelectorAll(".card-div .card-title:not(.card-div .card-div .card-title)")
  if (documents) {
    for (let d of documents) {
      if (d.textContent) index.value.push(d.textContent.replace(/^\s*([^\s].*[^\s])\s*$/, "$1"))
    }
  }
  loading.value = false
}

onMounted(() => {
  setIndex()
  watch(Props, setIndex)
})
watch(ok, () => {
  if (ok.value) loading.value = true
  setIndex()
})

</script>

<style lang="scss" scoped>
.index-item-border {
  border-bottom: 2px dashed rgb(var(--v-theme-primary));

  &:first-child {
    border-top: 2px dashed rgb(var(--v-theme-primary));
  }

  .index-item {
    position: relative;
    height: 3rem;
    padding: 0.75rem 0;
    border-radius: 4px;

    &:hover {
      background: rgb(var(--v-theme-primary));

      .circle {
        background: rgb(var(--v-theme-textbp));

        .number {
          color: rgb(var(--v-theme-primary));
        }
      }

      .text {
        color: rgb(var(--v-theme-textbp));
      }
    }

    .circle {
      position: relative;
      display: inline-block;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background: rgb(var(--v-theme-primary));
      top: 50%;
      left: 0.5rem;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);

      .number {
        color: rgb(var(--v-theme-textbp));
        position: absolute;
        display: inline-block;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 1.75rem;
        text-align: center;
      }
    }

    .text {
      position: absolute;
      display: inline-block;
      left: 2.75rem;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      color: rgb(var(--v-theme-link));
    }
  }
}
</style>