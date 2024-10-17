// dom.js
const getById = (id) => document.getElementById(id);

// DOM elements
export const domElements = {
    balanceValue: getById('balanceValue'),
    goalsConten: getById('goalsConten'),
    persentaseBar: getById('persentaseBar'),
    persentase: getById('persentase'),
    persenNumber: getById('persenNumber'),
    tombolTambah: getById('tombolTambah'),
    tombolKurang:getById('tombolKurang'),
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

// Fungsi untuk memformat angka ke dalam format Rupiah
export const formatRupiahValue = (value) => {
    let angka = value.toString().replace(/\D/g, ''); // Pastikan hanya angka
    return angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Tambahkan pemisah ribuan
};

export const formatRupiah = (element) => {
    let value = element instanceof HTMLInputElement ? element.value : element.textContent;
    let angka = value.replace(/\D/g, ''); // Remove non-numeric characters
    angka = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add thousand separators

    if (element instanceof HTMLInputElement) {
        element.value = angka;  // Update input value
    } else {
        element.textContent = `Rp ${angka}`;  // Update text content for non-input elements
    }
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
