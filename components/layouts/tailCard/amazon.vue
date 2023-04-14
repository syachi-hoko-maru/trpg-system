<template>
  <div id="div-amazon" class="align-center">
    <iframe
      src="https://rcm-fe.amazon-adsystem.com/e/cm?o=9&p=12&l=ur1&category=monthlydealevent&banner=140Z9CGTRPHE20SMKXR2&f=ifr&linkID=ee2c29e44c1bafe3501c352230bdb1aa&t=syachihokotrp-22&tracking_id=syachihokotrp-22"
      width="300" height="250" scrolling="no" border="0" marginwidth="0" id="amazon" style="border:none;" frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
  </div>
</template>

<script setup lang="ts">
const setFrame = () => {
  const frame = document.getElementById("amazon")
  const div = document.getElementById("div-amazon")
  if (!frame || !div) return
  if (div.clientWidth < 300) {
    console.log(div.clientWidth, frame.clientWidth)
    frame.style.transform = `scale(${div.clientWidth / frame.clientWidth})`
    div.style.height = `${div.clientWidth * 250 / 300 + 20}px`
  } else {
    div.style.height = `${250 + 20}px`
    div.style.left = `${(div.clientWidth - frame.clientWidth) / 2}px`
  }
}

onMounted(() => {
  setFrame()
  window.addEventListener("resize", setFrame);
})
</script>

<style lang="scss" scoped>
div#div-amazon {
  position: relative;

  iframe#amazon {
    position: absolute;
    transform-origin: 0 0;
  }
}
</style>