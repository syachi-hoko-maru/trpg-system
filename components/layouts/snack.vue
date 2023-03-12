<template>
  <div v-if="snack !== ''">
    <v-snackbar v-model="snackbar" color="info">
      {{ snack }}
      <template v-slot:actions>
        <v-btn color="textbp" variant="text" @click="closeSnack">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const { snack, closeSnack } = useSnack()
let snackbar = true
</script>