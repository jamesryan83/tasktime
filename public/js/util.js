"use strict";

var app = app || {};
app.util = {};


// month names
app.util.monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];


// formats a date to DD MonthName YYYY
// http://stackoverflow.com/a/25275808/4359306
app.util.formatDate = function(dateString) {
    var tempDate = new Date(dateString);

    var hours = tempDate.getHours();
    var minutes = tempDate.getMinutes();
    var seconds = tempDate.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return tempDate.getDate() + " " +
        app.util.monthNames[tempDate.getMonth()] + " " +
        tempDate.getFullYear() + " " +
        hours + ":" + minutes + ":" + seconds + " " + ampm;
}


// Returns a date formatted for sql server
// http://stackoverflow.com/a/21482470/4359306
app.util.getDateForServer = function() {
    var tempDate;
    
    tempDate = new Date();
    tempDate = tempDate.getUTCFullYear() + '-' +
            ('00' + (tempDate.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + tempDate.getUTCDate()).slice(-2) + ' ' +
            ('00' + tempDate.getHours()).slice(-2) + ':' +
            ('00' + tempDate.getUTCMinutes()).slice(-2) + ':' +
            ('00' + tempDate.getUTCSeconds()).slice(-2);

    return tempDate;
}
