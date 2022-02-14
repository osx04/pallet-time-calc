// Event called on form submit
function submitForm(event) {
    event.preventDefault();

    // Pallet start time
    var startTime = new Date(document.getElementById('start-time').value);
    // Pallet finish time
    var finishTime = new Date(document.getElementById('finish-time').value);
    
    calculate(startTime, finishTime);

    return false;
}

// Calulcate pallet times
function calculate(startTime, finishTime) {
    // Check that start time comes before finish time
    if (startTime > finishTime) {
        return alert('Start time must be earlier than finish time.')
    }

    // Check that start time comes before finish time
    if (startTime.getTime() === finishTime.getTime()) {
        return alert('Start time must different than finish time.')
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
}

// Update datetime value to today
function updateDateValue() {
    // Today's date in YYYY-MM-DD
    var todaysDate = new Date()
    var formattedDate = formatDate(todaysDate);

    // Pallet start time
    var startTime = document.getElementById('start-time');
    // Pallet finish time
    var finishTime = document.getElementById('finish-time');

    // Set datetime inputs to today's date
    startTime.value = formattedDate + 'T16:30';
    finishTime.value = formattedDate + 'T17:30';
}
