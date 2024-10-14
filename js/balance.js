// balance.js
import { balanceRef, set, onValue } from './firebase.js';
import { domElements } from './dom.js';
import { loadHistoryFromFirebase } from './history.js';

export let balance = 0;
let target = 0;

// Update balance
export const updateBalance = () => {
    domElements.balanceValue.textContent = `RP ${balance.toLocaleString()}`;
    updateProgress();
    set(balanceRef, balance);
    console.log("sukses");
};

// Update progress bar
const updateProgress = () => {
    if (target > 0) {
        const percentage = Math.min((balance / target) * 100, 100);
        domElements.persenNumber.textContent = `${percentage.toFixed(0)}%`;

        if (window.matchMedia("(max-width: 767px)").matches) {
            domElements.persentaseBar.style.width = `${percentage}%`;
            domElements.persentaseBar.style.backgroundColor = `#f39c12`;
        } else {
            domElements.persentaseBar.style.width = `100%`;
            domElements.persentaseBar.style.background = `conic-gradient(#f39c12 0% ${percentage}%, #2c2c2c ${percentage}%)`;
        }
    }
};

// Load balance from Firebase
export const loadBalanceFromFirebase = () => {
    onValue(balanceRef, (snapshot) => {
        const balanceData = snapshot.val();
        if (balanceData !== null) {
            balance = balanceData;
            updateBalance();
            console.log("sukses");
        }
    });
};

// balance.js
export const addToBalance = (amount) => {
    balance += amount; // update balance
    updateBalance();   // update display and sync with Firebase
};

export const subtractFromBalance = (amount) => {
    balance -= amount; // update balance
    updateBalance();   // update display and sync with Firebase
};

