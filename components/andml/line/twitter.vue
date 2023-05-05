<template>
  <item-button url="https://twitter.com/syachi_hoko_trp" prepend-icon="mdi-twitter" color="blue">
    しゃちほこ丸のTwitter
  </item-button>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  .left {
    width: 33%;
    min-width: 200px;
    max-width: 250px;
    padding: 1rem;

    .radius {
      border-radius: 50%;
    }
  }

  .right {
    width: 67%;
    flex-grow: 1;
    flex-shrink: 2;
  }
}
</style>