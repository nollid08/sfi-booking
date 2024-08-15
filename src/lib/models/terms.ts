import type firebase from "firebase/compat/app";
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

export class Term {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    beginSellingDate: Date;
    constructor(id: string, name: string, startDate: Date, endDate: Date, beginSellingDate: Date) {
        this.id = id;
        this.title = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.beginSellingDate = beginSellingDate;
    }
}

export const termConverter: FirestoreDataConverter<Term> = {
    toFirestore(term: Term): firebase.firestore.DocumentData {
        return {
            id: term.id,
            title: term.title,
            startDate: term.startDate,
            endDate: term.endDate,
            beginSelling: term.beginSellingDate
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Term {
        const data = snapshot.data();
        return new Term(snapshot.id, data.title, data.startDate, data.endDate, data.beginSelling);
    }
};