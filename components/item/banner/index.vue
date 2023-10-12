<template>
    <div class="banner my-5">
        <atom-link :to="to" :title="`バナー「${title}」`" button>
            <card nobefore>
                <template #tbefore>
                    <item-img :src="img" :alt="`バナー画像「${title}」`" />
                </template>
            </card>
        </atom-link>
    </div>
</template>

<script setup lang="ts">
interface Props {
    to: string,
    img: string
    title: string
}
const Props = defineProps<Props>();

</script>

<style scoped lang="scss">
.banner {
    transition: .3s;

    &:hover {
        opacity: 0.8;
        transform: scale(1.02);
    }
}
</style>