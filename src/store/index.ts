import { defineStore } from 'pinia';

import { Payload } from '@/components/PayloadBoard/types';
import { DefaultState } from '@/store/types';

export const useStore = defineStore('main', {
    actions: {
        setPayload(payload: Payload) {
            this.payload = payload;
        },
    },
    getters: {
        payloadStr: state => JSON.stringify(state.payload).replace('{"', '{\n"').replace('"}', '"\n}').replaceAll(',', ',\n'),
    },
    state: () =>
        ({
            payload: null,
        } as DefaultState),
});
