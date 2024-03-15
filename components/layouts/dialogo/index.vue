<template>
  <LayoutsDialogoCore>
    <PagesYesno
      v-if="dialogoArray[0].is === 'yesno'"
      :yesNoTypeStr="dialogoArray[0].type"
    />
    <CardArrayByAndml
      v-else-if="dialogoArray[0].is === 'normal'"
      :andml="dialogoArray[0].andml"
      :class="`${bgClass} text-textbp`"
    />
  </LayoutsDialogoCore>
</template>

<script setup lang="ts">
const { dialogoArray } = useDialogo();

const bgClass = computed(() => {
  switch (dialogoArray.value[0].type) {
    case "info":
      return "bg-info";
    case "error":
      return "bg-error";
  }
});
</script>

<style scoped lang="scss">
.dialogo {
  position: fixed;
  z-index: 1020;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(128, 128, 128, 0.5);

  .dialogoContainer {
    z-index: 1025;
    height: 100%;
    text-align: center;

    .dialogoRow {
      height: 100%;
      text-align: left;

      .dialogoCol {
        max-height: 60vh;
      }
    }

    .closeButton {
      bottom: 15vw;
    }
  }
}
</style>
