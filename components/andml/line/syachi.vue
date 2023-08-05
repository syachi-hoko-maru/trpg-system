<template>
    <div class="flex">
        <div class="left">
            <item-img src="/icon-image/simple.webp" class="radius" alt="アイコン" />
        </div>
        <div class="right">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
span.questionQ {
    font-size: 1.4rem;
    display: inline-block;
    margin-top: 0.6rem;
    margin-right: 0.6rem;
    background: linear-gradient(135deg, transparent 10%, royalblue 90%)
}
</style>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;

    .left {
        width: 45px;
        padding: 0;
        margin-right: 1rem;

        .radius {
            border-radius: 50%;
        }
    }

    .right {
        width: calc(100% - 45px - 1rem);
        flex-grow: 1;
        flex-shrink: 2;
    }
}
</style>