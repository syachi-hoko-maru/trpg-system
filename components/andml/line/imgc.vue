<template>
  <v-img :src="`${$templateText.basePath}${src}`" :alt="alt" class="my-2" />
</template>

<script setup lang="ts">
import { useNuxt } from '@nuxt/kit';

interface Props {
  props: string
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()

const [src, alt] = Props.props.split(",")
</script>