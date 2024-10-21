// balance.js
import { balanceRef, set, onValue } from './firebase.js';
import { domElements, formatRupiah } from './dom.js';
import { target } from './target.js';
import { loadHistoryFromFirebase } from './history.js';

export let balance = 0;

// Fungsi untuk menghitung balance dari riwayat
const calculateBalanceFromHistory = (historyData) => {
    let totalIncome = 0;
    let totalExpense = 0;

    Object.values(historyData).forEach((entry) => {
        if (entry.amount > 0) {
            totalIncome += entry.amount; // Tambahkan pemasukan
        } else {
            totalExpense += Math.abs(entry.amount); // Tambahkan pengeluaran
        }
    });

    balance = totalIncome - totalExpense; // Hitung balance
};


// Update balance
export const updateBalance = () => {
    domElements.balanceValue.textContent = `${balance}`;
    formatRupiah(domElements.balanceValue);
    updateProgress();
    set(balanceRef, balance);
    
};

// Fungsi untuk menghitung dan mengupdate balance setelah riwayat dihapus
export const updateBalanceFromHistory = (historyData) => {
    calculateBalanceFromHistory(historyData);
    updateBalance();
};

// Update progress bar
export const updateProgress = () => {

    if (target > 0) {
        const percentage = Math.min((balance / target) * 100, 100);
        domElements.persenNumber.textContent = `${percentage.toFixed(0)}%`;

        if (window.matchMedia("(max-width: 767px)").matches) {
            // Hanya ubah style.width jika dalam mode mobile
            persentaseBar.style.width = `${percentage}%`;
            persentaseBar.style.backgroundColor = `#9cb75a`
        } else {
            persentaseBar.style.width = `100%`
            persentaseBar.style.background = `conic-gradient(#9cb75a 0% ${percentage}%, #484a4b ${percentage}%)`;
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

