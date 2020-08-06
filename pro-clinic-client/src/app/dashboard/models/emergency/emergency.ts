import { Timestamp } from '@firebase/firestore-types';

export class Emergency {
    constructor(
        private date: Timestamp = new Timestamp(0, 0),
        public emergency: string = '',
        public patientName: string = '',
        public userId: string = ''
    ) {}

    public getDate = (): Date => this.date.toDate();
}
