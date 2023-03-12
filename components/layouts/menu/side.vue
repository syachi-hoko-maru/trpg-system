<template>
  <div id="sidemenu">
    <div id="side">
      <card>
        <layouts-menu-list />
      </card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidemenu {
  height: 100%;

  #side {
    position: sticky;
    top: 96px
  }
}
</style>