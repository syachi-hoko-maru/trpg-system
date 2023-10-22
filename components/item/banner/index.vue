<template>
    <ItemBannerBase :title="banner.title" :img="banner.img" :to="banner.to" />
</template>

<script setup lang="ts">
import { bannerList } from "~/src/banner/banners"
const { getBanner } = usePages()
const route = useRoute()

const banner = ref(bannerList[0])

onMounted(() => {
    banner.value = getBanner()
    watch(route, () => {
        banner.value = getBanner()
        if (banner.value.to + "/" === route.path) {
            banner.value = getBanner()
        }
    })
})
</script>