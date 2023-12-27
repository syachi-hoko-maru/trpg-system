<template>
    <template
        v-if="!isPast('2023/8/12') && !nowPageSetting.specialPage && nowPageSetting.to !== '/sw25/feature/c102' && (nowPageSetting.tags.join().indexOf('sw25') >= 0 || nowPageSetting.tags.join().indexOf('me') >= 0)">
        <atom-link to="/sw25/feature/c102" title="C102バナー">
            <v-card class="my-5 mx-5">
                <item-img src="/projects/c102/banner.webp" alt="ソード・ワールド2.5同人シナリオ集「冒険者の旅路」告知バナー" />
            </v-card>
        </atom-link>
    </template>
</template>

<script setup lang="ts">
import { isPast } from '~/src/util/date';

const { nowPageSetting } = usePages()
</script>