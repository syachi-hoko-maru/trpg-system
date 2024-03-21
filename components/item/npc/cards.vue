<template>
  <CardList :title="title">
    <ItemNpcCard v-for="npc of list" :npc="npc" />
  </CardList>
</template>

<script setup lang="ts">
import type { NpcData } from "~/src/pages/scenarioBone";

interface Props {
  title: string;
  list: NpcData[];
}
const Props = defineProps<Props>();
</script>
