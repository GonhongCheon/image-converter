<template>
    <p v-if="duplicatedIds?.length">
        {{ duplicatedIds }}
    </p>
</template>

<script lang="ts">
export default {
    name: 'DuplicateBoard',
};
</script>

<script lang="ts" setup>
import { toRefs } from 'vue';

import { useStore } from '@/store';

const { duplicatedIds } = toRefs(useStore());
</script>

<style lang="scss" scoped>
p {
    position: relative;
    padding: 60px 32px 16px 16px;
    border: 2px solid #444;
    border-radius: 8px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    white-space: pre-wrap;
}
</style>
