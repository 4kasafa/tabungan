// target.js
import { targetRef, set, onValue } from './firebase.js';
import { domElements, formatRupiah } from './dom.js';
import { updateBalance, updateProgress } from './balance.js';

export let target = 0;

// Load target from Firebase
export const loadTargetFromFirebase = () => {
    onValue(targetRef, (snapshot) => {
        const targetData = snapshot.val();
        if (targetData !== null) {
            target = targetData;
            domElements.goalsConten.textContent = `${target}`;
            formatRupiah(domElements.goalsConten);
            domElements.persentaseBar.style.display = 'flex';
            domElements.persentase.style.display = 'flex';
            updateProgress();// Update progress bar
        }
    });
};

// Set target in Firebase
export const setTarget = (newTarget) => {
    target = newTarget;
    set(targetRef, target);
};
