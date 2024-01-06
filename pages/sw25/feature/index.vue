<template>
    <item-pagesindex title="SW2.5 特集一覧" :page-setting-list="pageSettingList" />
</template>

<script setup lang="ts">
import { isHidden } from '~/src/pages/getPageSetting';
import { sortPagesByDate } from '~/src/util/date';
const { $pageSettingList } = useNuxtApp()

const pageSettingList: PageSetting[] = $pageSettingList
    .filter(page => page.to.startsWith("/sw25/feature/") && !isHidden(page) && !page.noSearch)
    .sort(sortPagesByDate(true))
</script>