<template>
    <div class="banner my-5">
        <atom-link :to="to" :title="`バナー「${title}」`" button>
            <card nobefore :elevation="6">
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
    padding: 0 7.5%;

    @media screen and (max-width: 600px) {
        padding: 0 5%;
    }

    &:hover {
        opacity: 0.8;
        transform: scale(1.02);
    }
}
</style>