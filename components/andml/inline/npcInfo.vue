<template>
  <v-menu open-on-hover v-if="mounted">
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="npc-name">
        {{ name }}
      </span>
    </template>
    <div class="npc-card">
      <card>
        <template #tbefore v-if="img">
          <div class="npc-card-content d-flex">
            <div class="image">
              <item-img :src="img" :alt="`${name}のイメージ画像`" />
            </div>
            <div class="text">
              <h5 class="npc-name" v-if="nameOnly">
                {{ nameOnly }}
              </h5>
              <span class="npc-basic-info" v-if="basicInfo">
                {{ basicInfo }}
              </span>
              <br />
              <span
                class="npc-description"
                v-if="description && description !== 'undefined'"
              >
                {{ description }}
              </span>
            </div>
          </div>
        </template>
      </card>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
interface Props {
  props: string;
}
const Props = defineProps<Props>();

const name: string | undefined = Props.props.split(",")[0];
const nameOnly: string | undefined = name?.replace(/（.*）$/, "");
const basicInfo: string | undefined = Props.props.split(",")[1];
const img: string | undefined = Props.props.split(",")[2];
const description: string | undefined = Props.props.split(",")[3];

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<style scoped lang="scss">
span.npc-name {
  background-image: linear-gradient(
    to right,
    #888,
    #888 6px,
    transparent 6px,
    transparent 15px
  );
  background-size: 15px 1px;
  background-position: left bottom;
  background-repeat: repeat-x;
  cursor: pointer;
}

div.npc-card {
  width: 400px;
  height: 250px;
  min-width: 20vw;
  max-width: 90vw;
  div.npc-card-content {
    width: 400px;
    height: 200px;
    .image {
      position: static;
      width: 40%;
      height: 100%;
    }
    .text {
      position: static;
      overflow: hidden;
      margin: 8px;
      width: calc(60% - 16px);
      height: calc(100% - 16px);

      @media screen and (max-width: 600px) {
        margin: 4px;
        width: calc(60% - 8px);
        height: calc(100% - 8px);
      }
      .npc-name {
        font-size: 1.1rem;
      }
      .npc-basic-info {
        font-size: 0.7rem;
      }
      .npc-description {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
