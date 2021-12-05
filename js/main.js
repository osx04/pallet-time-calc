// Calulcate pallet times
function calculate(event) {
    event.preventDefault();
    
    var startTime = document.getElementById('start-time').valueAsDate;
    changeDateToToday(startTime);
    var finishTime = document.getElementById('finish-time').valueAsDate;
    changeDateToToday(finishTime);
    var breakMinutes = document.getElementById('break-minutes').value;
    if (breakMinutes < 0 || isNaN(breakMinutes)) {
        breakMinutes = 0;
    }
    // Break minutes converted to miliseconds
    var breakMinutesInMs = breakMinutes * 60000;

    // Finish time - start time - time spent on break
    var duration = finishTime - startTime - breakMinutesInMs;

    // Get total hours from duration
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    // Get total minutes from duration
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    alert(`You finished your pallet in ${hours} hour(s) and ${minutes} minute(s). Good job!`);
    return false;
}

function changeDateToToday(date) {
    var todaysDate = new Date();
    date.setFullYear(todaysDate.getFullYear());
    date.setMonth(todaysDate.getMonth());
    date.setDate(todaysDate.getDate());
}