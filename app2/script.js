// script.js
const memoForm = document.getElementById('memoForm');
const memoriesContainer = document.getElementById('memories');

memoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    
    // Dati da inviare al server
    const formData = {
        name: name,
        amount: amount,
        date: date
    };

    // Effettua una richiesta POST al server per salvare i dati nel database
    fetch('http://localhost:3000/addMemory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Messaggio di conferma dal server
        // Aggiungi la memoria al container visualizzato
        const memoryItem = document.createElement('div');
        memoryItem.innerHTML = `<strong>${name}</strong>: ${amount} - ${date}`;
        memoriesContainer.appendChild(memoryItem);
    })
    .catch(error => console.error('Errore:', error));
});