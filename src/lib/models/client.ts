
import type firebase from "firebase/compat/app";
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import { ClientType } from "./clientType";

export class Client {
	id: string;
	name: string;
	eircode: string;
	rollNumber: string;
	type: ClientType;
	town: string;
	county: string;
	isDeis: boolean;
	classrooms?: number;
	students: number;
	joinDate?: Date;
	previousBookingIds: string[];
	hasHall?: boolean;
	hasParking?: boolean;
	largestClassSize?: number;
	hasMats?: boolean;
	contactName?: string;
	contactEmail?: string;
	contactPhone?: string;
	principalName?: string;
	principalEmail?: string;
	notes?: string;

	constructor(
		id: string,
		name: string,
		eircode: string,
		rollNumber: string,
		typeId: string,
		town: string,
		county: string,
		isDeis: boolean,
		students: number,
		previousBookingIds: string[]
	) {
		this.id = id;
		this.name = name;
		this.eircode = eircode;
		this.rollNumber = rollNumber;
		this.type = new ClientType(typeId);
		this.town = town;
		this.county = county;
		this.isDeis = isDeis;
		this.students = students;
		this.previousBookingIds = previousBookingIds;
	}
}

export const clientConverter: FirestoreDataConverter<Client> = {
	toFirestore(client: Client): firebase.firestore.DocumentData {
		return {
			id: client.id,
			name: client.name,
			eircode: client.eircode,
			rollNumber: client.rollNumber,
			type: client.type.id,
			town: client.town,
			county: client.county,
			isDeis: client.isDeis,
			classrooms: client.classrooms,
			students: client.students,
			joinDate: client.joinDate,
			previousBookingIds: client.previousBookingIds,
			hasHall: client.hasHall,
			hasParking: client.hasParking,
			largestClassSize: client.largestClassSize,
			hasMats: client.hasMats,
			contactName: client.contactName,
			contactEmail: client.contactEmail,
			contactPhone: client.contactPhone,
			principalName: client.principalName,
			principalEmail: client.principalEmail,
			notes: client.notes
		};
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot<DocumentData>,
		options: firebase.firestore.SnapshotOptions | undefined
	): Client {
		const data = snapshot.data(options)!;
		return new Client(
			snapshot.id,
			data.name,
			data.eircode,
			data.rollNumber,
			data.type,
			data.town  ?? "Kildorrery Shanballymore Glenahulla",
			data.county ?? "Donegal",
			data.isDeis,
			data.students,
			data.previousBookingIds
		);
	}
};
