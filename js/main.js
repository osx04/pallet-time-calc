// Array with minutes on break
var breaks = [];
// Value used to generate ID for breaks
var breaksIncrement = 0;

// Calulcate pallet times
function calculate(event) {
    event.preventDefault();
    
    // Pallet start time
    var startTime = document.getElementById('start-time').valueAsDate;
    // Pallet finish time
    var finishTime = document.getElementById('finish-time').valueAsDate;

    // Array of break minutes ex. [15, 60, 15]
    var breaksArray = breaks.map(function (breakElement) {
        return breakElement.min;
    });

    // Add break minutes together into one number
    var breakMinutes = breaksArray.reduce(function (acc, val) {
        return acc + val;
    }, 0)

    // Break minutes converted to miliseconds
    var breakMinutesInMs = breakMinutes * 60000;

    // Finish time - start time - time spent on break
    var duration = finishTime - startTime - breakMinutesInMs;

    // Get total hours from duration
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    // Get total minutes from duration
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    // Convert hours and minutes into float like on SAP
    var hourMinFloat = hours + (minutes / 60);

    alert(`You finished your pallet in ${hourMinFloat.toFixed(1)} hour(s).`);
    return false;
}

// // Change date to today keeping time the same
// function changeDateToToday(date) {
//     var todaysDate = new Date();
//     date.setFullYear(todaysDate.getFullYear());
//     date.setMonth(todaysDate.getMonth());
//     date.setDate(todaysDate.getDate());
// }

function addBreak(event) {
    event.preventDefault();

    // Prompt for break minutes
    var breakMinutes = prompt('How long was your break? Please enter a number zero or greater.', 0);
    var breakMinutesNum = parseInt(breakMinutes);

    // Validate number given by user
    if (isNaN(breakMinutesNum)) {
        alert('Please enter a valid number.');
        return false;
    }

    if (breakMinutesNum < 0) {
        alert('Please enter a number zero or greater.');
        return false;
    }

    // Add break to breaks array and increment next ID
    breaks.push({id: breaksIncrement, min: breakMinutesNum});
    breaksIncrement += 1;
    updateBreaksTable();

    return false;
}

// Update breaks table
function updateBreaksTable() {
    var breaksList = document.getElementById('breaks-list');

    if (breaks.length === 0) {
        breaksList.setAttribute('class', 'hidden');
    } else {
        breaksList.removeAttribute('class')
    }

    breaksList.innerHTML = breaks.map(function (value) {
        return `<li id="${value.id}">${value.min} minutes <button onclick="return deleteBreak(event, '${value.id}')">Delete</button></li>`;
    }).join('');
}

// Delete break from array and update table
function deleteBreak(event, id) {
    event.preventDefault();

    var breakToDelete = breaks.findIndex(function (breakElement) {
        return breakElement.id == parseInt(id);
    });
    breaks.splice(breakToDelete, 1);
    updateBreaksTable();

    return false;
}

// Copied from https://stackoverflow.com/a/10893658
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }