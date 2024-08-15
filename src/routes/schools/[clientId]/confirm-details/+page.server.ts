import type { PageServerLoad } from "./$types.js";
import { fail, superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { redirect, type Actions } from "@sveltejs/kit";
import { adminDB } from "$lib/server/admin.js";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const clientId = event.params.clientId;
    if (clientId === undefined) return fail(400, { form });
    const clientRef = adminDB.collection("clients").doc(clientId);
    const classrooms = form.data.classrooms;
    const students = form.data.students;
    clientRef.update({
      classrooms: classrooms,
      students: students,
    });

    redirect(301, `/schools/${clientId}/select-programmes`);
  },
};