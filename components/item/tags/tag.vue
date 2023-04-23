<template>
  <v-menu v-model="menu" location="top start" origin="top start" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="d-inline">
        <item-tags-chip :label="pageTagSetting.label" />
      </div>
    </template>

    <v-card width="300">
      <v-list bg-color="info">
        <v-list-item>
          <v-list-item-title>{{ pageTagSetting.label }}</v-list-item-title>
          <v-list-item-subtitle class="tagMenu">{{ pageTagSetting.explanation }}</v-list-item-subtitle>
          <template v-slot:append>
            <v-list-item-action>
              <v-btn icon variant="text" @click="() => menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-list-item>
          <item-button @click="search" :normalButton="true">このタグがついたページ</item-button>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
interface Props {
  pageTag: PageTag,
  pageTagSetting: PageTagSetting
}
const Props = defineProps<Props>();

const menu = ref(false)

const search = () => {
  menu.value = false
  navigateTo(`/search?tag=${Props.pageTag}`)
}

</script>

<style scoped>
.tagMenu {
  margin-top: 0.25rem;
  display: inline-block;
  overflow: visible;
}
</style>