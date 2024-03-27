<template>
  <card-array-by-andml :andml="andml_main" />
</template>

<script setup lang="ts">
import { mainAndml } from "~/src/shinano/pages/main";

const andml_main = mainAndml;
</script>
