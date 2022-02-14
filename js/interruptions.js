// Array with minutes not working pallet [{id, min}]
var interruptions = [];
// Value used to generate ID for interruptions
var interruptionIncrement = 0;


function addInterruption(event) {
    event.preventDefault();

    // Prompt for interruption minutes
    var interruptionMinutes = prompt('How long were you away from your pallet? Please enter a number in minutes above zero.', 0);
    // Stop function on cancel or null
    if (interruptionMinutes === null) {
        return false;
    }
    var interruptionMinutesNum = parseInt(interruptionMinutes);

    // Validate number given by user
    if (isNaN(interruptionMinutesNum)) {
        alert('Please enter a valid number.');
        return false;
    }

    if (interruptionMinutesNum < 0) {
        alert('Please enter a number zero or greater.');
        return false;
    }

    // Add interruption to interruptions array and increment next ID
    interruptions.push({id: interruptionIncrement, min: interruptionMinutesNum});
    interruptionIncrement += 1;
    updateInterruptionsTable();

    return false;
}

// Update interruptions table
function updateInterruptionsTable() {
    var interruptionList = document.getElementById('interruptions-list');

    if (interruptions.length === 0) {
        interruptionList.setAttribute('class', 'hidden');
    } else {
        interruptionList.removeAttribute('class')
    }

    interruptionList.innerHTML = interruptions.map(function (value) {
        return `<li id="${value.id}">${value.min} minutes <button onclick="return deleteInterruption(event, '${value.id}')">Delete</button></li>`;
    }).join('');
}

// Delete interruption from array and update table
function deleteInterruption(event, id) {
    event.preventDefault();

    var interruptionToDelete = interruptions.findIndex(function (interupton) {
        return interupton.id == parseInt(id);
    });
    interruptions.splice(interruptionToDelete, 1);
    updateInterruptionsTable();

    return false;
}