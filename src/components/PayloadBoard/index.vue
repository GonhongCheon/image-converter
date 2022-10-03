<template>
    <p v-if="payload">
        <button @click="onClickCopy">copy</button>
        {{ payloadStr }}
    </p>
</template>

<script lang="ts">
export default {
    name: 'PayloadBoard',
};
</script>

<script lang="ts" setup>
import { toRefs } from 'vue';

import { useStore } from '@/store';

const { payloadStr, payload } = toRefs(useStore());

const onClickCopy = () => {
    if (navigator?.clipboard) {
        navigator.clipboard.writeText(payloadStr.value);
    } else {
        const t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = payloadStr.value;
        t.select();
        t.setSelectionRange(0, 9999);
        document.execCommand('copy');
        document.body.removeChild(t);
    }
};
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

    button {
        padding: 10px;
        border: 0;
        border-radius: 16px;
        background-color: #fff;
        top: 16px;
        right: 16px;
        position: absolute;
        font-size: 16px;
        font-weight: 700;

        &:active {
            background-color: #eaeaea;
        }
    }
}
</style>
