import { defineStore } from 'pinia';

import { Payload } from '@/components/PayloadBoard/types';
import { DefaultState } from '@/store/types';

export const useStore = defineStore('main', {
    actions: {
        addDuplicate(id: string) {
            if (!this.duplicatedIds) this.duplicatedIds = [];
            this.duplicatedIds.push(id);
        },
        setPayload(payload: Payload) {
            this.payload = payload;
        },
    },
    getters: {
        payloadStr: state => JSON.stringify(state.payload).replace('{"', '{\n"').replace('"}', '"\n}').replaceAll(',', ',\n'),
    },
    state: () =>
        ({
            duplicatedIds: null,
            payload: null,
        } as DefaultState),
});
