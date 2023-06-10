<template>
  <div>
    {{ dateText }}
    <slot />
  </div>
</template>

<script setup lang="ts">
import { formatToTimeZone } from "date-fns-timezone";

interface Props {
  props: string
}
const Props = defineProps<Props>();

const getDateText = (date: Date) => formatToTimeZone(date, "YYYY年M月D日", {
  timeZone: "Asia/Tokyo",
});
let dateText: string
if (Props.props === "today") {
  dateText = getDateText(new Date())
} else {
  dateText = getDateText(new Date(Props.props))
}
</script>