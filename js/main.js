// main.js
import { domElements, hideAllPopups, clearInput, addRupiahFormatting, getNumericValue } from './dom.js';
import { loadBalanceFromFirebase, updateBalance } from './balance.js';
import { loadTargetFromFirebase, setTarget } from './target.js';
import { loadHistoryFromFirebase } from './history.js';
import { push } from './firebase.js';

// Initialize the app
const initApp = () => {
    loadBalanceFromFirebase();
    loadTargetFromFirebase();
    loadHistoryFromFirebase();

    addRupiahFormatting('targetInput');
    addRupiahFormatting('expenseInput');
    addRupiahFormatting('incomeInput');
};

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function() {
    domElements.hamburger.addEventListener('click', () => {
        // Toggle menu visibility
        domElements.navMenu.classList.toggle('open');
        
        // Toggle hamburger icon between "hamburger" and "X"
        if (domElements.navMenu.classList.contains('open')) {
            domElements.hamburger.innerHTML = '&#10005;'; // Unicode for "X"
        } else {
            domElements.hamburger.innerHTML = '&#9776;'; // Unicode for hamburger
        }
    });
});

// Event listeners
domElements.goalsConten.addEventListener('click', () => {
    hideAllPopups();
    domElements.goalsPopup.style.display = 'block';
});

domElements.setTargetButton.addEventListener('click', () => {
    const newTarget = getNumericValue('targetInput');
    if (newTarget > 0) {
        setTarget(newTarget);
    }
    clearInput('targetInput');
    domElements.goalsPopup.style.display = 'none';
});

domElements.addIncomeButton.addEventListener('click', () => {
    const income = getNumericValue('incomeInput');
    if (income > 0) {
        balance += income;
        updateBalance();
        const entry = { date: new Date().toISOString(), description: 'Pemasukan', amount: income, color: 'green' };
        push(historyRef, entry); // Add to Firebase
    }
    clearInput('incomeInput');
    domElements.incomePopup.style.display = 'none';
});

domElements.subtractExpenseButton.addEventListener('click', () => {
    const expense = getNumericValue('expenseInput');
    const note = domElements.expenseNote.value || 'Pengambilan';
    if (expense > 0) {
        if (expense > balance) {
            domElements.alertPopup.style.display = 'block';
        } else {
            balance -= expense;
            updateBalance();
            const entry = { date: new Date().toISOString(), description: note, amount: -expense, color: 'red' };
            push(historyRef, entry); // Add to Firebase
        }
    }
    clearInput('expenseInput');
    clearInput('expenseNote');
    domElements.expensePopup.style.display = 'none';
});

domElements.closeAlert.addEventListener('click', () => {
    domElements.alertPopup.style.display = 'none';
});

// Start the app
initApp();
