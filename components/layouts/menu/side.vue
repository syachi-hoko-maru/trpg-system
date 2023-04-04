<template>
  <div id="sidemenu" class="pb-5">
    <div id="side">
      <nav>
        <v-card class="px-3 py-2">
          <layouts-menu-list />
        </v-card>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidemenu {
  height: 100%;

  #side {
    position: sticky;
    top: 80px;
  }
}
</style>