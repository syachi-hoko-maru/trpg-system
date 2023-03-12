<template>
  <v-main>
    <v-container id="mainContainer">
      <v-row justify="space-around" align="stretch">
        <v-col cols="12" xs="12" sm="11" lg="10" xl="9">
          <v-row justify="space-around" align="stretch">
            <v-col cols="12" md="4" xl="3" class="hidden-sm-and-down" v-if="!error">
              <layouts-menu-side />
            </v-col>
            <v-col cols="12" md="8">
              <v-row justify="center" align="stretch">
                <v-col>
                  <slot />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <div class="hidden-md-and-up" v-if="!error">
    <layouts-menu-nav />
  </div>
</template>

<script setup lang="ts">

interface Props {
  error?: boolean
}
const Props = defineProps<Props>();

</script>