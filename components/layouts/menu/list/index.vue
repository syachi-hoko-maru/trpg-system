<template>
  <v-list density="compact" nav class="bg-background  text-text">
    <template v-for="item of items">
      <template v-if="'categoryName' in item" :key="item.categoryName">
        <div v-if="!item.hidden">
          <v-list-subheader class="text-text">{{ item.categoryName }}</v-list-subheader>
          <layouts-menu-list-pagelist :pages="item.pageList" />
        </div>
      </template>
      <layouts-menu-list-pagelist v-else :pages="[item]" :key="item.title" />
    </template>

  </v-list>
</template>

<script setup lang="ts">
const drawer = true
const { $menu } = useNuxtApp()
const items = $menu ? $menu() : []
</script>