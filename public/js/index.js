"use strict";

var app = app || {};

app.selectedTimelineItemId = 0;
app.lastEditedText = "";  // for contenteditable


// window load
window.onload = function () {

    // tasklist page
    if (window.location.pathname === "/tasklist") {
        app.tasklist.setup();
    }
}


// navigate to login screen
app.goToLoginScreen = function () {
    window.location.href = "/login";
}


// navigate to register screen
app.goToRegisterScreen = function () {
    window.location.href = "/register";
}




// show ajax error
app.ajaxError = function (err) {
    console.log(err);
    if (err.status == 401) {
        alert("Session timed out.  You need to log in again");
    } else {
        alert(err.status + " : " + err.statusText);
    }
}


// ajax started
app.ajaxStart = function () {
    $("#imgLoading").show();
}

// ajax finished
app.ajaxStop = function () {
    $("#imgLoading").hide();
}



// show dialog
app.showDialog = function(heading, text, hideCancelButton, showTextArea, callback) {

    if (hideCancelButton === true) {
        $("#buttonDialogCancel").hide();
    } else {
        $("#buttonDialogCancel").show();
    }

    if (showTextArea === true) {
        $("#textareaDialog").show();
        $("#divDialog").css({ "height": "310px" });
    } else {
        $("#textareaDialog").hide();
        $("#divDialog").css({ "height": "150px" });
    }


    $("#h2Dialog").text(heading);
    $("#pDialog").text(text);
    $("#divDialogBackground").show();

    $("#buttonDialogOk").off();
    $("#buttonDialogOk").click(function () {
        $("#divDialogBackground").hide();
        if (callback) callback(true);
    });

    $("#buttonDialogCancel").off();
    $("#buttonDialogCancel").click(function () {
        $("#divDialogBackground").hide();
        if (callback) callback(false);
    });
}


// show help div
app.showHelp = function () {
    $("#divHelpBackground").show();
}

// hide help div
app.closeHelp = function () {
    $("#divHelpBackground").hide();
}


