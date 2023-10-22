<template>
    <ItemBannerBase v-if="banner" :title="banner.title" :img="banner.img" :to="banner.to" />
</template>

<script setup lang="ts">
import { bannerList } from "~/src/banner/banners"
interface Props {
    name?: string
}
const Props = defineProps<Props>();
const { getBanner, nowPageSetting } = usePages()

const banner = ref(Props.name ? bannerList.find(({ name }) => name === Props.name) : bannerList[0])

onMounted(() => {
    if (Props.name) return
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