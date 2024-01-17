<template>
    <AtomLink :to="item.url" :title="`${item.name}の画像リンク（Amazon）`" button>
        <Card>
            <template #tbefore>
                <ItemImg :src="item.image.URL" :alt="`${item.name}の画像（Amazon）`" width="170px" />
            </template>
            <template #before>
                <div class="amazon-string">
                    {{ item.name }}
                </div>
                <div class="amazon-amazon">
                    <ItemCaption>
                        <span :style="`color:${$vuetify.theme.current.colors.amazon}`">Amazon</span> <v-icon
                            icon="mdi-open-in-new" size="x-small" :color="$vuetify.theme.current.colors.amazon" />
                    </ItemCaption>
                </div>
            </template>
        </Card>
    </AtomLink>
</template>

<script setup lang="ts">
import { AmazonSearchResult } from "~/src/amazon-paapi/types";

interface Props {
    item: AmazonSearchResult<string>
}
const Props = defineProps<Props>();
</script>

<style scoped lang="scss">
.amazon-string {
    padding: 5px 10px;
    width: 170px;
    height: 70px;
    overflow: hidden;
}

.amazon-amazon {
    width: 170px;
    padding: 0 8px 3px 0;
    overflow: hidden;
    font-weight: bold;
}
</style>