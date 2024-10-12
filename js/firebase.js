// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const appSettings = {
    databaseURL: "https://tabungan-d57a1-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);

// Firebase references
const balanceRef = ref(database, 'balance');
const targetRef = ref(database, 'target');
const historyRef = ref(database, 'history');

// Export for use in main.js
export { balanceRef, targetRef, historyRef, set, push, onValue };
