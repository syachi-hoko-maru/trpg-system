<template>
  <div id="shadow" v-show="drawer" @click.stop="() => drawer = false" />
  <div id="nav" v-show="drawer">
    <!-- <v-navigation-drawer v-model="drawer" location="bottom" temporary class="bg-background" style="height: 60vh;"> -->
    <layouts-menu-list />
    <!-- </v-navigation-drawer> -->
  </div>
  <atom-link :to="'/search'">
    <v-btn v-show="drawer" depressed elevation="2" fab size="large" icon id="navSettingButton"
      class="navButton bg-secondary">
      <v-icon icon="mdi-magnify" size="large" />
    </v-btn>
  </atom-link>
  <v-btn depressed elevation="2" fab size="x-large" icon id="navButton" class="navButton bg-secondary"
    @click.stop="() => drawer = !drawer">
    <v-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" size="large" />
  </v-btn>
</template>

<script setup lang="ts">

const route = useRoute()
let drawer = ref(false)

watch(route, () => {
  drawer.value = false
})
</script>

<style lang="scss" scoped>
#shadow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  z-index: 1013;
  overflow: auto;
  background-color: #333;
  opacity: 0.8;
}

#nav {
  position: fixed;
  width: 100vw;
  max-height: 60vh;
  bottom: 0;
  z-index: 1014;
  overflow: scroll;
}

.navButton {
  z-index: 1015;
  position: fixed;
  right: 5vw;

  &#navSettingButton {
    bottom: calc(5vw + 64px + 10px);
  }

  &#navButton {
    bottom: 5vw;
  }
}
</style>