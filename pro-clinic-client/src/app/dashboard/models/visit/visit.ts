import { Timestamp } from '@firebase/firestore-types';
import { VisitType } from 'src/app/visits/models/visit-type.enum';

export class Visit {
    constructor(
        public date: Timestamp = new Timestamp(0, 0),
        public patientName: string = '',
        public reason: string = '',
        public userId: string = '',
        public type: string = ''
    ) {}
}
