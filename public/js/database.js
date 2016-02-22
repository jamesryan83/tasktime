"use strict";

var app = app || {};
app.db = {};




// *************************** Timeline Items ***************************


// Create timeline item
app.db.createNewTimelineItem = function (callback) {
    app.db.makeAjaxCall("POST", "/timeline-items", {
        "time": app.util.getDateForServer()
    }, callback);
}


// Get timeline items.  callback optional
app.db.getTimelineItems = function (callback) {
    app.db.makeAjaxCall("GET", "/timeline-items", null, callback);
}


// Update timeline item
app.db.updateTimelineItem = function (timelineItemId, title, text, callback) {
    app.db.makeAjaxCall("PUT", "/timeline-items", {
        "timelineItemId": timelineItemId,
        "title" : title,
        "text": text,
        "time": app.util.getDateForServer()
    }, callback);
}


// Delete timeline item and associated tasks
app.db.deleteTimelineItem = function (timelineItemId, callback) {
    app.db.makeAjaxCall("DELETE", "/timeline-items", {
        "timelineItemId": timelineItemId
    }, callback);
}











// *************************** TaskList Items ***************************


// Create TaskList item
app.db.createTaskListItem = function(timelineItemId, text, callback) {
    app.db.makeAjaxCall("POST", "/tasklist-items", {
        "text": text,
        "timelineItemId": timelineItemId,
        "time": app.util.getDateForServer()
    }, callback);
}


// Get TaskList items
app.db.getTaskListItems = function (timelineItemId, callback) {
    app.db.makeAjaxCall("GET", "/tasklist-items", {
        "timelineItemId": timelineItemId
    }, callback);
}


// Update TaskList item
app.db.updateTaskListItem = function (timelineItemId, taskListItemId, text, checked, callback) {
    app.db.makeAjaxCall("PUT", "/tasklist-items", {
        "timelineItemId": timelineItemId,
        "taskListItemId": taskListItemId,
        "text": text,
        "checked": checked,
        "time": app.util.getDateForServer()
    }, callback);
}


// Delete TaskList item
app.db.deleteTaskListItem = function (taskListItemId, callback) {
    app.db.makeAjaxCall("DELETE", "/tasklist-items", {
        "taskListItemId": taskListItemId
    }, callback);
}





// *************************** Other things ***************************


// Generic ajax function
app.db.makeAjaxCall = function (method, url, data, callback) {
    $.ajax({
        method: method,
        url: url,
        data: data,
        success: function (data) {
            callback({ success: true, data: data });
        },
        error: function (error) {            
            callback({ success: false, data: error });
        }
    });
}




