// history.js
import { historyRef, push, onValue } from './firebase.js';
import { domElements } from './dom.js';

// Add history entry
export const addHistory = (date, description, amount, color) => {
    const row = document.createElement('tr');
    
    // Format date and time separately
    const formattedDate = date.toLocaleDateString(); // Hanya tanggal
    const formattedTime = date.toLocaleTimeString(); // Hanya jam
    
    row.innerHTML = `
        <td>
            ${formattedDate}<br>
            <small>${formattedTime}</small>
        </td>
        <td>${description}</td>
        <td style="color:${color}">RP ${Math.abs(amount).toLocaleString()}</td>
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
        }
    });
};
