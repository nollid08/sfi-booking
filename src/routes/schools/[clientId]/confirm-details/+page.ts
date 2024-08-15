import { doc, getDoc, query } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { firestore } from '$lib/firebase';
import { clientConverter } from '$lib/models/client';
import { error } from '@sveltejs/kit';

export const load = (async ({ data, }) => {


        return {
            form: data.form
        };

}) satisfies PageLoad;