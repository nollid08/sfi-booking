import type firebase from "firebase/compat/app";
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import { ChevronDown } from "lucide-svelte";
import { ClientType } from "./clientType";


export class Activity {
    id:string;
    name:string;
    isComputerBookable:boolean;

    constructor(id:string, name:string, isComputerBookable:boolean) {
        this.id = id;
        this.name = name;
        this.isComputerBookable = isComputerBookable;
    }


}



export const activityConverter: FirestoreDataConverter<Activity> = {
    toFirestore(activity: Activity): firebase.firestore.DocumentData {
        return {
            id: activity.id,
            name: activity.name,
            isComputerBookable: activity.isComputerBookable
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Activity {
        const data = snapshot.data();
        const isComputerBookable = data.isComputerBookable !== undefined ? data.isComputerBookable : true;
        return new Activity(snapshot.id, data.name, isComputerBookable);
    }
};