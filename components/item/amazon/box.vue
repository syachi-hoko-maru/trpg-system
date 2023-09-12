<template>
  <div id="div-amazon" class="align-center">
    <iframe
      src="https://rcm-fe.amazon-adsystem.com/e/cm?o=9&p=12&l=ur1&category=mothersday23&banner=0EBJTC10YSKTZX6VN6R2&f=ifr&linkID=94052bee623c691e558744d3276339e6&t=syachihokotrp-22&tracking_id=syachihokotrp-22"
      width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
    <iframe
      src="https://rcm-fe.amazon-adsystem.com/e/cm?o=9&p=12&l=ur1&category=amazonstudent&banner=1EXM3ZCBAGEJJSPD8ZG2&f=ifr&linkID=0ddbdbaad69e1acdd9fb2d344db8617f&t=syachihokotrp-22&tracking_id=syachihokotrp-22"
      width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const setFrame = () => {
  const div = document.getElementById("div-amazon")
  if (!div) return
  const frames = div.querySelectorAll("iframe")
  const num = Math.floor(Math.random() * frames.length)
  const frame = frames[num]
  if (!frame) return
  frame.style.display = "block"
  if (div.clientWidth < 300) {
    // console.log(div.clientWidth, frame.clientWidth)
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
  watch(route, setFrame)
})
</script>

<style lang="scss" scoped>
div#div-amazon {
  position: relative;

  iframe {
    position: absolute;
    display: none;
    transform-origin: 0 0;
  }
}
</style>