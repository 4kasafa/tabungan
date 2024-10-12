// dom.js
const getById = (id) => document.getElementById(id);

// DOM elements
export const domElements = {
    balanceValue: getById('balanceValue'),
    goalsConten: getById('goalsConten'),
    persentaseBar: getById('persentaseBar'),
    persentase: getById('persentase'),
    persenNumber: getById('persenNumber'),
    historyBody: getById('historyBody'),
    goalsPopup: getById('goalsPopup'),
    incomePopup: getById('incomePopup'),
    expensePopup: getById('expensePopup'),
    alertPopup: getById('alertPopup'),
    setTargetButton: getById('setTargetButton'),
    addIncomeButton: getById('addIncomeButton'),
    subtractExpenseButton: getById('subtractExpenseButton'),
    closeAlert: getById('closeAlert'),
    targetInput: getById('targetInput'),
    incomeInput: getById('incomeInput'),
    expenseInput: getById('expenseInput'),
    expenseNote: getById('expenseNote'),
    hamburger: getById('hamburger'),
    navMenu: getById('navMenu'),
};

// Utility functions
export const clearInput = (inputId) => {
    document.getElementById(inputId).value = '';
};

export const formatRupiah = (input) => {
    let angka = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    angka = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add thousand separators
    input.value = angka;
};

export const getNumericValue = (inputId) => {
    const inputValue = document.getElementById(inputId).value;
    return parseInt(inputValue.replace(/\./g, '')) || 0;
};

export const hideAllPopups = () => {
    // Hide all popups
    domElements.goalsPopup.style.display = 'none';
    domElements.incomePopup.style.display = 'none';
    domElements.expensePopup.style.display = 'none';
    domElements.alertPopup.style.display = 'none';
};

export const addRupiahFormatting = (inputId) => {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener('input', function() {
        formatRupiah(this);
    });
};
