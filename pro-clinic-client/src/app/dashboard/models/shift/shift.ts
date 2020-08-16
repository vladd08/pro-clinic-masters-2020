import { Timestamp } from '@firebase/firestore-types';
import { Guid } from 'src/shared/utils/classes/guid/guid';

export class Shift {
    constructor(
        public date: Timestamp = new Timestamp(0, 0),
        public hours: number = 0,
        public userId: string,
        public guid: string = ''
    ) {}
}
