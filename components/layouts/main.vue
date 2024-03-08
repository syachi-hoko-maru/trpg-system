<template>
  <v-main
    style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 64px;
      --v-layout-bottom: 292px;
    "
  >
    <v-container id="mainContainer">
      <v-row justify="space-around" align="stretch">
        <v-col cols="12" xs="12" sm="11" lg="12" xl="10">
          <slot v-if="pageSetting.to === '/'" />
          <v-row justify="space-around" align="stretch" v-else>
            <v-col
              cols="3"
              md="4"
              lg="3"
              class="hidden-sm-and-down"
              v-if="!error"
            >
              <layouts-menu-side />
            </v-col>
            <v-col cols="12" md="8" lg="6" id="center">
              <slot />
            </v-col>
            <v-col cols="12" lg="3" class="hidden-md-and-down">
              <layouts-menu-right />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <nav>
    <div class="hidden-md-and-up" v-if="!error">
      <layouts-menu-nav />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";

interface Props {
  error?: boolean;
}
const Props = defineProps<Props>();

const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);
</script>
