<template>
  <Card>
    <template #pbefore>
      <div class="my-5">
        <div class="d-flex with-image" v-if="npc.img">
          <ItemImg
            :src="npc.img"
            :alt="`${npc.name}のイメージ画像`"
            class="img"
          />
          <div class="img-side">
            <h3 class="name">{{ npc.name }}</h3>
            <div class="my-1">
              {{ npc.syuzoku ? npc.syuzoku : "任意" }}/{{
                npc.gender ? npc.gender : "任意"
              }}/{{ npc.age ? npc.age : "任意" }}
            </div>
            <div class="gino">
              {{
                npc.gino
                  ?.map(([g, l]) => `${g}技能${l ? `（${l}レベル）` : ""}`)
                  .join("/ ")
              }}
            </div>
            <div class="desc my-2">
              <Andml :andmls="npc.description ? npc.description : ''" />
            </div>
          </div>
        </div>
        <div class="mb-3" v-else>
          <h3 class="name">{{ npc.name }}</h3>
          <div class="my-1">
            {{ npc.syuzoku ? npc.syuzoku : "任意" }}/{{
              npc.gender ? npc.gender : "任意"
            }}/{{ npc.age ? npc.age : "任意" }}
          </div>
          <div class="gino">
            {{
              npc.gino
                ?.map(([g, l]) => `${g}技能${l ? `（${l}レベル）` : ""}`)
                .join("/ ")
            }}
          </div>
          <div class="desc my-2">
            <Andml :andmls="npc.description ? npc.description : ''" />
          </div>
        </div>
        <div class="serif">「{{ npc.selfDescription }}」</div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { NpcData } from "~/src/pages/scenarioBone";

interface Props {
  npc: NpcData;
}
const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
div.with-image {
  margin: 20px;
  width: calc(100% - 20px);
  position: static;
  .img {
    width: 30%;
  }
  .img-side {
    width: 70%;
  }
}
h3.name {
  font-size: 1.25rem;
  font-weight: normal;
}
div.gino {
  font-size: 0.75rem;
  font-weight: normal;
}
div.description {
  font-size: 1rem;
}
div.serif {
  font-size: 1.2rem;
}
</style>
