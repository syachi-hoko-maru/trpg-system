<template>
    <ItemBannerBase :title="banner.title" :img="banner.img" :to="banner.to" />
</template>

<script setup lang="ts">
import { bannerList } from "~/src/banner/banners"
const { getBanner, nowPageSetting } = usePages()

const banner = ref(bannerList[0])

onMounted(() => {
    banner.value = getBanner()
    watch(nowPageSetting, () => {
        banner.value = getBanner()
        console.log(banner.value.to === nowPageSetting.value.to, banner.value.to, nowPageSetting.value.to)
        if (banner.value.to === nowPageSetting.value.to) {
            banner.value = getBanner()
        }
    })
})
</script>