<template>
  <dl>
    <dt>{{ dateText }}</dt>
    <dd>
      <slot />
    </dd>
  </dl>
</template>

<script setup lang="ts">
import { formatToTimeZone } from "date-fns-timezone";
import { nowDate } from "~/src/util/date";

interface Props {
  props: string
}
const Props = defineProps<Props>();

const getDateText = (date: Date) => formatToTimeZone(date, "YYYY年M月D日", {
  timeZone: "Asia/Tokyo",
});
let dateText: string
if (Props.props === "today") {
  dateText = getDateText(nowDate())
} else {
  dateText = getDateText(new Date(Props.props))
}
</script>

<style lang="scss" scoped>
dl {
  display: flex;

  dt {
    width: 10em;
  }

  dd {
    width: calc(100% - 10rem);
  }
}
</style>