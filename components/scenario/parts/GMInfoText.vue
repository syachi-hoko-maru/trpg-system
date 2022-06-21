<template lang="pug">
div
  p GM向け情報：<br>
    slot
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "GMInfoTextComponent",
});
</script>