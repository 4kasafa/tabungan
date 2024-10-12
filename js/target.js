// target.js
import { targetRef, set, onValue } from './firebase.js';
import { domElements } from './dom.js';
import { updateBalance } from './balance.js';

let target = 0;

// Load target from Firebase
export const loadTargetFromFirebase = () => {
    onValue(targetRef, (snapshot) => {
        const targetData = snapshot.val();
        if (targetData !== null) {
            target = targetData;
            domElements.goalsConten.textContent = `RP ${target.toLocaleString()}`;
            domElements.persentaseBar.style.display = 'flex';
            domElements.persentase.style.display = 'flex';
            updateBalance(); // Update progress bar
        }
    });
};

// Set target in Firebase
export const setTarget = (newTarget) => {
    target = newTarget;
    set(targetRef, target);
};
