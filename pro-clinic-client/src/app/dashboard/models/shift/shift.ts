import { Timestamp } from '@firebase/firestore-types';

export class Shift {
    constructor(
        private date: Timestamp = new Timestamp(0, 0),
        public hours: number = 0,
        public userId: string
    ) {}

    public getDate = (): Date => this.date.toDate();
}
