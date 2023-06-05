<template>
    <div :class="class" v-if="pageTrees.length">
        <atom-link to="/" :deco="!forTitle" title="トップページへのリンク" type="tailcard">トップ</atom-link>
        <template v-for="(pageTree, i) of pageTrees" :key="pageTree.to">
            <span class="user-select-none"> &gt; </span>
            <atom-link :to="pageTree.to" :deco="!forTitle" :title="`ページ「${pageTree.title}」へのリンク`" type="tailcard">{{
                pageTree.title
            }}</atom-link>
        </template>
        <span class="user-select-none"> &gt; </span>
        <template v-if="!forTitle">
            <br>
            <span class="user-select-none">
                {{ nowPageSetting.title }}
            </span>
        </template>
    </div>
</template>

<script setup lang="ts">
const { nowPageSetting } = usePages()
const { $getPageSetting } = useNuxtApp()

interface Props {
    forTitle?: boolean
    class?: string
}
const Props = defineProps<Props>();

const pageTrees = computed(() => {
    const result: {
        title: string,
        to: string
    }[] = []
    const urls: string[] = []
    nowPageSetting.value.to.split("/").filter(u => u).forEach(u => {
        urls.push(u)
        const to = "/" + urls.join("/")
        if (to === nowPageSetting.value.to) return
        const ps = $getPageSetting(to)
        if (!ps) throw `[ERROR] page ${to} not found`
        result.push({
            title: ps.title,
            to: ps.to
        })
    })
    return result
})

</script>