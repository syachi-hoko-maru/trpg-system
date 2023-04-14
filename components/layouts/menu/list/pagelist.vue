<template>
  <div>
    <template v-for="(page, i) in Props.pages" :key="page.title">
      <atom-link v-if="!page.hidden" :to="page.to" :disabled="page.disabled" :title="`ページ「${page.title}」へのリンク`">
        <v-list-item :value="page.to" :disabled="page.disabled" :class="getNowPage() === page.to ? 'bg-primary' : ''">
          <template v-slot:prepend>
            <v-icon :icon="page.icon" />
          </template>
          <v-list-item-title v-text="page.title" />
        </v-list-item>
      </atom-link>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pages: MenuPage[]
}
const Props = defineProps<Props>()

const { getNowPage } = usePages()
</script>