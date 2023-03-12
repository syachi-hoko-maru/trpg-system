<template>
  <v-app>
    <layouts-header error />
    <layouts-main error>
      <slot />
    </layouts-main>
    <layouts-footer error />
  </v-app>
</template>

