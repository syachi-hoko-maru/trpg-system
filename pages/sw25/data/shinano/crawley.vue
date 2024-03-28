<template>
  <pages-shinano>
    <card-array-by-andml :andml="andml_main" />
  </pages-shinano>
</template>

<script setup lang="ts">
import { crawleyAndml } from "~/src/shinano/pages/crawley";

const andml_main = crawleyAndml;
</script>
