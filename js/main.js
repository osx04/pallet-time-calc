// Array with minutes not working pallet [{id, min}]
var interruptions = [];
// Value used to generate ID for interruptions
var interruptionIncrement = 0;

// Calulcate pallet times
function calculate(event) {
    event.preventDefault();
    
    // Pallet start time
    var startTime = document.getElementById('start-time').valueAsDate;
    // Pallet finish time
    var finishTime = document.getElementById('finish-time').valueAsDate;

    // Check that start time comes before finish time
    if (startTime > finishTime) {
        return alert('Start time must be earlier than finish time.')
    }
    // Array of minutes not working pallet ex. [15, 60, 15]
    var interruptionsArray = interruptions.map(function (interuption) {
        return interuption.min;
    });

    // Add break minutes together into one number
    var interuptionMinutes = interruptionsArray.reduce(function (acc, val) {
        return acc + val;
    }, 0)

    // Break minutes converted to miliseconds
    var interruptionMinsInMs = interuptionMinutes * 60000;

    // Finish time - start time - time spent on break
    var duration = finishTime - startTime - interruptionMinsInMs;

    // Get total hours from duration
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    // Get total minutes from duration
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    // Convert hours and minutes into float like on SAP
    var hourMinFloat = hours + (minutes / 60);

    alert(`You finished your pallet in ${hourMinFloat.toFixed(1)} hour(s).`);
    return false;
}

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

// Update datetime value to today
function updateDateValue() {
    // Today's date in YYYY-MM-DDT00:00
    var todaysDate = new Date().toISOString().slice(0, 10) + 'T00:00'
    // Pallet start time
    var startTime = document.getElementById('start-time');
    // Pallet finish time
    var finishTime = document.getElementById('finish-time');

    // Set datetime inputs to today's date
    startTime.value = todaysDate;
    finishTime.value = todaysDate;
}

// Copied from https://stackoverflow.com/a/10893658
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}