<template>
    <input type="file" multiple accept="image/*" @change="onChange" />
    <button @click="onConvert">Convert</button>
    <a ref="link" :href="url" download="images.zip"></a>
</template>

<script lang="ts">
export default {
    name: 'ImageConverter',
};
</script>

<script lang="ts" setup>
import JSZip from 'jszip';
import { ref, toRef } from 'vue';

import { useStore } from '@/store';

const IMAGE_PREFIX = '//cdn.pet-friends.co.kr/static/product/experiment/detail/v2/';
const files = ref<File[]>();
const url = ref('');
const link = ref<HTMLInputElement>();

const setPayload = toRef(useStore(), 'setPayload');

const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target?.files) {
        files.value = Array.from(target.files);
    }
};

const getExt = (file: File) => {
    const split = file.name.split('.');
    return '.' + split[split.length - 1];
};

const onConvert = async () => {
    if (!files?.value?.length) return false;
    const zip = new JSZip();

    const ret = files.value?.reduce((obj, file) => {
        const nameUUID = window?.crypto?.randomUUID();
        let ext = getExt(file);

        const numbers = file.name
            .split(']')
            .map(str => (str.includes('[') ? str.replace('[', '') : null))
            .filter(str => str) as string[];

        zip.file(`${nameUUID}${ext}`, file);

        const innerObj = numbers.reduce(
            (obj, key) => ({
                ...obj,
                [key]: `${IMAGE_PREFIX}${nameUUID}${ext}`,
            }),
            {},
        );

        return {
            ...obj,
            ...innerObj,
        };
    }, {});

    setPayload?.value?.(ret);
    url.value = window?.URL?.createObjectURL(await zip.generateAsync({ type: 'blob' }));
    setTimeout(() => {
        link.value?.click();
    }, 0);
};
</script>

<style lang="scss" scoped></style>
