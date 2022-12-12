import { Nullable } from '@/common/types';
import { Payload } from '@/components/PayloadBoard/types';

export interface DefaultState {
    duplicatedIds: Nullable<string[]>;
    payload: Nullable<Payload>;
}
