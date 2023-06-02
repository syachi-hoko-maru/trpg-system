<template>
    <v-list density="compact" nav class="bg-background text-text">
        <template v-for="(tag, i) in $pageTags" :key="tag">
            <atom-link :to="`/search?tag=${tag}`" :title="`タグ「${$pageTagSettings[tag].label}」がついたページ一覧へのリンク`" type="right">
                <v-list-item>
                    <template v-slot:prepend>
                        <v-icon icon="mdi-label" />
                    </template>
                    <v-list-item-title v-text="$pageTagSettings[tag].label" />
                </v-list-item>
            </atom-link>
        </template>
    </v-list>
</template>