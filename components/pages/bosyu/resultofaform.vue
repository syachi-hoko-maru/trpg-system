<template>
  <div v-if="mounted" v-for="item of $setDisable(items).filter(i => !i.disabled)" :key="item.label">
    <template v-if="item.type === 'boolean'">
      <template v-if="item.name === 'nitteiType' && item.value">
        {{ item.label }}
      </template>
      <template v-else-if="item.name !== 'nitteiType'">
        {{ item.label }}: {{ item.value ? "可" : "不可" }}
      </template>
    </template>
    <template v-else-if="item.type === 'slider'">
      {{ item.label }}: {{ Array.isArray(item.value) ? item.value.join("〜") : item.value }}
    </template>
    <template v-else-if="item.type === 'parent'">エラー</template>
    <template v-else-if="item.type === 'textarea' && item.value !== ''">
      <div>{{ item.label }}: </div>
      <div class="pl-6 pre-wrap">
        {{ item.value }}
      </div>
    </template>
    <template v-else-if="item.value && item.value !== '0'">
      <template v-if="String(item.value).length < 15">
        {{ item.label }}: {{ item.value }}
      </template>
      <template v-else>
        <div>{{ item.label }}: </div>
        <div class="pl-6 text-right">{{ item.value }}</div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items: FormSetting[]
}
const Props = defineProps<Props>();

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>