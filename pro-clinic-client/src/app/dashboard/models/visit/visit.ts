import { Timestamp } from '@firebase/firestore-types';

export class Visit {
    constructor(
        public date: Timestamp = new Timestamp(0, 0),
        public patientName: string = '',
        public reason: string = '',
        public userId: string = ''
    ) {}
}
