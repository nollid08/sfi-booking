<script>
	import { firestore } from '$lib/firebase';
	import '../app.css';
	import { FirebaseApp } from 'sveltefire';
</script>

<FirebaseApp {firestore}>
	<slot></slot>
</FirebaseApp>
