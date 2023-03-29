<template>
  <div id="sidemenu" class="pb-10">
    <div id="side">
      <nav>
        <card>
          <layouts-menu-list />
        </card>
      </nav>
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