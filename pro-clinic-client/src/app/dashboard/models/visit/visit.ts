import * as firebase from 'firebase';

export class Visit {
    constructor(
        public date: firebase.firestore.Timestamp = new firebase.firestore.Timestamp(
            0,
            0
        ),
        public patientName: string = '',
        public reason: string = '',
        public userId: string = '',
        public type: string = ''
    ) {}
}
