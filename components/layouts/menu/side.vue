<template>
  <div id="sidemenu" class="pb-10">
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
    top: 100px;
  }
}
</style>