// history.js
import { historyRef, push, onValue } from './firebase.js';
import { domElements, formatRupiah, formatRupiahValue } from './dom.js';

// Add history entry
export const addHistory = (date, description, amount, color) => {
    const row = document.createElement('tr');
    
    // Format date and time separately
    const formattedDate = date.toLocaleDateString(); // Hanya tanggal
    const formattedTime = date.toLocaleTimeString(); // Hanya jam
    const formatedAmount = `Rp ${formatRupiahValue(Math.abs(amount))}`;
    
    row.innerHTML = `
        <td>
            ${formattedDate}<br>
            <small>${formattedTime}</small>
        </td>
        <td>${description}</td>
        <td style="color:${color}">${formatedAmount}</td>
    `;
    
    domElements.historyBody.prepend(row);
};

// Load history from Firebase
export const loadHistoryFromFirebase = () => {
    onValue(historyRef, (snapshot) => {
        const historyData = snapshot.val();
        if (historyData !== null) {
            domElements.historyBody.innerHTML = '';
            Object.values(historyData).forEach((entry) => {
                addHistory(new Date(entry.date), entry.description, entry.amount, entry.color);
            });
            updateBalanceFromHistory(historyData); // Update balance berdasarkan riwayat yang dimuat
        }
    });
};