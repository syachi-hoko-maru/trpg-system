<template>
  <div class="animationItem" id="animationContainer"></div>
</template>

<script lang="ts" setup>
import axios from "axios";
import lottie from "lottie-web";
interface Props {
  /** json path */
  props: string;
}
const Props = defineProps<Props>();

type AnimationJson = {
  assets: {
    id: string;
    w: number;
    h: number;
    /** dir */
    u: string;
    /** file name */
    p: string;
    e: number;
  }[];
  layer: unknown[];
} & {
  [key in string]?: unknown;
};
const animationEvt = async () => {
  console.log("anime");
  const elm: Element | null = document.getElementById("animationContainer");
  const data: AnimationJson | null = await axios
    .get(`/animations/${Props.props}/data.json`)
    .then((res) => res.data);
  if (!elm || !data) return;
  // urlの修正
  data.assets = data.assets.map((d) => {
    d.u = `/animations/${Props.props}/images/`;
    return d;
  });
  const anim = lottie.loadAnimation({
    container: elm,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: data,
  });
  anim.addEventListener("complete", () => {
    //処理
  });
};

onMounted(() => {
  animationEvt();
});
</script>
