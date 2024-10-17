// balance.js
import { balanceRef, set, onValue } from './firebase.js';
import { domElements, formatRupiah } from './dom.js';
import { target } from './target.js';

export let balance = 0;

// Update balance
export const updateBalance = () => {
    domElements.balanceValue.textContent = `${balance}`;
    formatRupiah(domElements.balanceValue);
    updateProgress();
    set(balanceRef, balance);
    
};

// Update progress bar
export const updateProgress = () => {

    if (target > 0) {
        const percentage = Math.min((balance / target) * 100, 100);
        domElements.persenNumber.textContent = `${percentage.toFixed(0)}%`;

        if (window.matchMedia("(max-width: 767px)").matches) {
            // Hanya ubah style.width jika dalam mode mobile
            persentaseBar.style.width = `${percentage}%`;
            persentaseBar.style.backgroundColor = `#00BCD4`
        } else {
            persentaseBar.style.width = `100%`
            persentaseBar.style.background = `conic-gradient(#00BCD4 0% ${percentage}%, #2c2c2c ${percentage}%)`;
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

