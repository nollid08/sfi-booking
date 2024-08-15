import type { LayoutLoad } from './$types';
import { collection, collectionGroup, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { firestore } from '$lib/firebase';
import { clientConverter } from '$lib/models/client';
import { error } from '@sveltejs/kit';
import { activityConverter } from '$lib/models/activity';
import { termConverter } from '$lib/models/terms';

export const load = (async ({params}) => {
    const clientId = params.clientId;

    const activitiesRef = collectionGroup(firestore, 'activities');
    const activitiesQuery =  query(activitiesRef).withConverter(activityConverter);
    const activitySnapshot = await getDocs(activitiesQuery);
    const activities = activitySnapshot.docs.map(doc => doc.data());

    const termsRef = collection(firestore, 'terms',);
    const termsQuery = query(termsRef, where(
        'beginSelling', '<', Timestamp.fromDate(new Date())
    ), where(
        'endDate', '>', Timestamp.fromDate(addDays(new Date(), 10),)
    ),
     orderBy("endDate")).withConverter(termConverter);
    const termsSnapshot = await getDocs(termsQuery);
    const terms = termsSnapshot.docs.map(doc => doc.data());
    


    //Get doc where rollNumber value is equal to rollNumber, not id
    const schoolRef = doc(firestore, 'clients', clientId
    ).withConverter(clientConverter);
    const schoolSnap = await getDoc(schoolRef);

    if (schoolSnap.exists()) {
        return {
            school: schoolSnap.data()!,
            activities,
            terms,
        };
      } else {
        console.error(`School with Client ID "${clientId}" not found`);
		error(404, {
			message: `School with Client ID "${clientId}" not found`,
		});
      }

}) satisfies LayoutLoad;

;


function addDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}