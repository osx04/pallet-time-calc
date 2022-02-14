// Event called on form submit
function submitForm(event) {
    event.preventDefault();

    // Pallet start time
    var startTime = new Date(document.getElementById('start-time').value);
    // Pallet time
    var palletTime = parseFloat(document.getElementById('pallet-time').value);
    // Associates working
    var assocWorking = parseInt(document.getElementById('associates-working').value);
    
    calculate(startTime, palletTime, assocWorking);

    return false;
}

// Calulcate pallet times
function calculate(startTime, palletTime, assocWorking) {
    // Check that pallet time is greater than zero
    if (palletTime < 0.1) {
        return alert('Pallet time must be greater than or equal to 0.1.')
    }

    // Check that pallet time is greater than zero
    if (assocWorking < 1) {
        return alert('Number of associates working must be an integer greater than or equal to 1.')
    }
    // Array of minutes not working pallet ex. [15, 60, 15]
    var interruptionsArray = interruptions.map(function (interuption) {
        return interuption.min;
    });

    // Add break minutes together into one number
    var interuptionMinutes = interruptionsArray.reduce(function (acc, val) {
        return acc + val;
    }, 0)

    var calcDate = moment(startTime)
        .add(moment.duration(palletTime / assocWorking, 'hours'))
        .subtract(interuptionMinutes, 'm')
        .format('hh:mm A')

    alert(`You should finish your pallet by ${calcDate}.`);
}

// Update datetime value to today
function updateDateValue() {
    // Today's date
    var todaysDate = moment();
    // Pallet start time
    var startTime = document.getElementById('start-time');

    // Set datetime inputs to today's date
    startTime.value = todaysDate.format('YYYY-MM-DDTHH:mm');
}
