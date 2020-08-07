import { Timestamp } from '@firebase/firestore-types';

export class Emergency {
    constructor(
        public date: Timestamp = new Timestamp(0, 0),
        public emergency: string = '',
        public patientName: string = '',
        public userId: string = ''
    ) {}
}
