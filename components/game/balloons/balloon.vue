<template>
  <div class="balloon-div" :id="`${classRandId}`">
    <svg
      class="balloon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 114.88 218.08"
      v-if="balloon"
      @click="click"
    >
      <g>
        <path
          class="parts"
          d="m57.44,142.47c-.35,0-.7-.01-1.05-.03v74.61c0,.56.46,1.03,1.03,1.03h.04c.56,0,1.02-.46,1.02-1.03v-74.61c-.34.02-.69.03-1.04.03Z"
        />
        <path
          class="color"
          :fill="fill"
          d="m57.44,0C25.72,0,0,24.13,0,51.9c0,36.56,37.59,55.21,55.42,79.73-4.51.51-7.91,2.72-7.91,5.36,0,3.02,4.44,5.48,9.93,5.48s9.92-2.45,9.92-5.48c0-2.64-3.39-4.85-7.9-5.36,17.83-24.52,55.42-43.17,55.42-79.73C114.88,24.13,89.16,0,57.44,0Z"
        />
        <rect
          class="parts"
          x="50"
          y="129.05"
          width="14.89"
          height="4.47"
          rx="2.23"
          ry="2.23"
        />
        <ellipse
          class="right"
          cx="35.62"
          cy="24.13"
          rx="16.67"
          ry="9.42"
          transform="translate(-7.4 24.39) rotate(-34.46)"
        />
      </g>
    </svg>
    <div class="effect" :style="`border-color: ${fill}`" v-else />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

const colors = [
  "#ed1c24",
  "#994fd1",
  "#65ba38",
  "#4f7ff0",
  "#ffa366",
  "#f57fc8",
  "#3bf5c6",
  "#fff419",
  "#bbf50c",
  "#8cfffb",
  "#d600b2",
  "#ff3700",
];
const fill = ref(colors[0]);

const balloon = ref(true);
const div: Ref<HTMLElement | null> = ref(null);

const classRandId = ref("balloon_0");
const setUp = () => {
  classRandId.value = `balloon_${String(Math.floor(Math.random() * 10000))}`;
  fill.value = colors[Math.floor(Math.random() * colors.length)];
  setTimeout(() => {
    div.value = document.getElementById(classRandId.value);
    if (!div.value) return;
    div.value.style.animation = "";
    const left = String(Math.floor(Math.random() * 100) - 7.5 / 2);
    div.value.style.left = left + "vw";
    div.value.style.top = "150vh";
    div.value.style.display = "block";
    const rand = Math.floor(Math.random() * 10);
    const animation = `wobbling_x ${
      rand < 2.5 || rand > 7.5 ? "0.7" : rand < 5.0 ? "0.8" : "0.9"
    }s ease-in-out 100 alternate, wobbling_y ${
      rand % 2 ? "1.1" : "1.2"
    }s ease-in-out 100 alternate, fly_high ${String(rand + 9)}s ease-in-out`;
    div.value.style.animation = animation;
    setTimeout(() => {
      if (div.value) {
        div.value.style.display = "none";
        div.value.style.animation = "";
      }
    }, (rand + 9) * 1000);
  }, Math.floor(Math.random() * 7.5 * 1000) + 500);
};

const click = () => {
  balloon.value = false;
  if (div.value) {
    div.value.style.zIndex = "1003";
  }
};

onMounted(() => {
  setUp();
});
</script>

<style lang="scss">
.balloon-div {
  width: 7.5vw;
  min-width: 100px;
  position: fixed;
  z-index: 1005;
  display: none;

  .balloon {
    width: 7.5vw;
    min-width: 100px;

    .parts {
      fill: #f9ec78;
    }

    .color {
      opacity: 0.7;
    }

    .right {
      fill: #fff;
      opacity: 0.5;
    }
  }

  .effect {
    opacity: 0;
    width: 15vw;
    min-width: 200px;
    height: 15vw;
    min-height: 200px;
    border: dotted 10px;
    border-radius: 50%;
    animation: effect 1s 1;
  }
}

@keyframes wobbling_x {
  0% {
    margin-left: 12px;
  }

  100% {
    margin-left: 0px;
  }
}

@keyframes wobbling_y {
  0% {
    margin-bottom: 0px;
  }

  100% {
    margin-bottom: 10px;
  }
}

@keyframes fly_high {
  70% {
    transform: translateY(-140vh);
  }

  100% {
    transform: translateY(-200vh);
  }
}

@keyframes effect {
  0% {
    transform: scale(0.3);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
