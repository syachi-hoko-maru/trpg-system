<template>
    <div>
        現在あなたは {{ count }} 体の幽霊を見つけています！
    </div>
</template>

<script setup lang="ts">
const count = ref(0)
const getArr = (): string[] => {
    let arr: string[] = []
    try {
        const row = localStorage.getItem("ghost2023")
        if (!row) throw "no storage"
        const rowArr = JSON.parse(row)
        if (Array.isArray(rowArr) && rowArr.length) {
            arr = rowArr
        }
    } catch (e) {
    }
    return arr
}
onMounted(() => {
    count.value = getArr().length
})
</script>