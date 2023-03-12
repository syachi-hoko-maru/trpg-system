<template>
  <div class="dialogo" v-if="dialogoArray.length">
    <v-container class="dialogoContainer py-0">
      <v-row justify="center" align="center" class="dialogoRow" @click.self="closeDialogo">
        <v-col cols="12" md="8" @click.self="closeDialogo" class="overflow-y-auto dialogoCol">
          <card-array-by-andml :andml="dialogoArray[0].andml" :class="`${bgClass} text-textbp`" />
        </v-col>
      </v-row>
      <v-btn depressed elevation="2" fab size="large" icon :class="`${bgClass} closeButton`" @click.stop="closeDialogo">
        <v-icon icon="mdi-close" />
      </v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const { dialogoArray, closeDialogo } = useDialogo()

const bgClass = computed(() => {
  switch (dialogoArray.value[0].type) {
    case "info": return "bg-info";
    case "error": return "bg-error";
  }
})

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