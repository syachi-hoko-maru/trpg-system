<template>
  <div class="sidemenu pb-5">
    <div
      :id="Props.side"
      class="side"
      :class="cl"
      :style="width ? `width: ${width}px` : ''"
    >
      <nav>
        <slot />
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { event } from "vue-gtag";

interface Props {
  side: "left" | "right";
}
const Props = defineProps<Props>();

const route = useRoute();
const { ok } = useLoad();

const cl = ref("sticky");
const width = ref(0);
const height = ref(0);
const centerHeight = ref(0);

let windowHeight = 0;

const set = (el: HTMLElement, centerEl: HTMLElement) => {
  if (!width.value && el.offsetWidth) width.value = el.offsetWidth;
  height.value = Math.max(height.value, el.offsetHeight);
  centerHeight.value = Math.max(height.value, centerEl.offsetHeight);
  if (height.value > windowHeight) {
    if (cl.value !== "static" && scrollY < height.value - windowHeight + 120) {
      cl.value = "static";
      // console.log("static")
    }
    if (cl.value !== "fixed" && scrollY > height.value - windowHeight + 120) {
      cl.value = "fixed";
      // console.log("fixed")
    }
    if (
      cl.value === "fixed" &&
      scrollY > centerHeight.value - windowHeight + 120
    ) {
      cl.value = "absolute";
    }
  }
  if (
    Props.side === "right" &&
    scrollCount.value < scrollList.length &&
    scrollY > (centerHeight.value * scrollList[scrollCount.value]) / 100
  ) {
    event("scrolls", {
      url: route.fullPath,
      scroll: scrollList[scrollCount.value],
    });
    scrollCount.value++;
  }
};
const scrollList = [15, 30, 45, 60, 75] as const;
const scrollCount = ref(0);
onMounted(() => {
  const el = document.getElementById(Props.side);
  const centerEl = document.getElementById("center");
  if (!el || !centerEl) return;
  width.value = el.offsetWidth;
  windowHeight = window.innerHeight;
  set(el, centerEl);
  watch(ok, () => set(el, centerEl));
  watch(route, () => (scrollCount.value = 0));
  window.addEventListener("resize", () => {
    width.value = el.offsetWidth;
  });
  document.addEventListener("scroll", () => set(el, centerEl));
});
</script>

<style lang="scss" scoped>
.sidemenu {
  height: 100%;

  .side {
    width: inherit;

    &.sticky {
      position: sticky;
      top: 80px;
      bottom: 220px;
    }

    &.static {
      position: static;
    }

    &.fixed {
      position: fixed;
      bottom: 40px;
    }

    &.absolute {
      position: absolute;
      bottom: 220px;
    }
  }
}
</style>
