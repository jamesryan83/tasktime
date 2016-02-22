"use strict";

var app = app || {};
app.tasklist = {};


// setup
app.tasklist.setup = function () {

    app.tasklist.getTimelineItems();

    // new timeline item
    $("#buttonNewTimelineItem").click(function () {
        app.tasklist.createNewTimelineItem();
    })


    // new task item input
    $("#inputTaskText").keydown(function (e) {
        if (e.which == 13) {  // enter
            e.preventDefault();
            app.tasklist.createTaskListItem()
        }
    });


    // new task item button
    $("#buttonAddTaskItem").click(function () {
        app.tasklist.createTaskListItem();
    });


    // task dropdown list
    $("#ulDropdownTasks li > a").click(function (e) {
        if (this.innerHTML === "Create Multiple Tasks") {
            app.tasklist.createMultipleTaskItems();
        } else if (this.innerHTML === "Delete All Tasks") {
            app.tasklist.deleteAllTaskItems();
        }
    });
}







// *************************** Timeline Items ***************************


// Create timeline item
app.tasklist.createNewTimelineItem = function () {
    app.db.createNewTimelineItem(function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }

        app.tasklist.getTimelineItems(function () {
            app.tasklist.setSelectdTimelineItem($("#divTimeline").find("li")[0]);
        });
    });
}



// Get timeline items.  callback optional
app.tasklist.getTimelineItems = function (callback) {

    app.db.getTimelineItems(function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }

        var timelineItems = JSON.parse(result.data);

        // clear screen and return if no items
        if (timelineItems.length === 0) {
            $("#divTimeline").empty();
            $("#divTaskItems").empty();
            return;
        }


        // change date format
        for (var i = 0; i < timelineItems.length; i++) {
            timelineItems[i].created_at =
                app.util.formatDate(timelineItems[i].created_at);
        }


        // add items to timeline
        $("#divTimeline").loadTemplate($("#templateTimelineItem"), timelineItems);


        // timeline item clicked
        $("#divTimeline").find("li").click(function () {
            app.tasklist.setSelectdTimelineItem(this);
        });


        // add keydown event to contenteditable elements
        $("#divTimeline").find("[contenteditable='true']").keydown(function (e) {

            // save when enter pressed
            if (e.which == 13) {
                e.preventDefault();

                var elementType = $(e.currentTarget)[0].nodeName;
                var text = $(e.currentTarget)[0].innerHTML;
                app.tasklist.updateTimelineItem(elementType, text);
            }
        });


        // contenteditable focus events
        // return text to original if enter not pressed on contenteditable
        $("#divTimeline").find("[contenteditable='true']").focus(function (e) {
            app.lastEditedText = e.target.innerHTML;
        });
        $("#divTimeline").find("[contenteditable='true']").blur(function (e) {
            e.target.innerHTML = app.lastEditedText;
        });


        // delete icon click event
        $("#divTimeline").find("i.delete").click(function (e) {
            // prevent loading tasks
            e.stopPropagation();

            app.selectedTimelineItemId = e.target.id;
            app.tasklist.deleteTimelineItem(e.target.id);
        });


        // select new timeline item
        app.tasklist.setSelectdTimelineItem();

        if (callback) callback();
    });
}



// Update timeline item
app.tasklist.updateTimelineItem = function (type, text) {

    var data = app.tasklist.getSelectedTimelineItemData();

    if (data.title.length > 255) {
        alert("Title can't be longer than 255 characters");
        return;
    }

    // create item and refresh page
    app.db.updateTimelineItem(data.itemId, data.title, data.text, function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }

        app.tasklist.getTimelineItems();
    });
}



// Delete timeline item and associated tasks
app.tasklist.deleteTimelineItem = function () {

    // ask before deleting
    app.showDialog("Delete Timeline Item",
        "This will also delete all the tasks for this item", false, false, function (result) {

            // if ok clicked on dialog, delete item
            if (result === true) {
                app.db.deleteTimelineItem(app.selectedTimelineItemId, function (result) {
                    if (result.success === false) { app.ajaxError(result.data); return; }

                    app.tasklist.getTimelineItems();
                });
            }
        }
    );
}











// *************************** TaskList Items ***************************


// Create TaskList item
app.tasklist.createTaskListItem = function() {

    // get text
    var text = $("#inputTaskText").val();
    if (text === "") return;

    // needs to be at least 1 timeline item to save task into
    if ($("#divTimeline").find("li").length === 0) {
        app.showDialog("Alert", "You need to create a Timeline Item first", true, false);
        return;
    }

    app.db.createTaskListItem(app.selectedTimelineItemId, text, function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }

        // clear create task input
        $("#inputTaskText").val("");

        app.tasklist.getTaskListItems();
    });
}



// Get TaskList items
app.tasklist.getTaskListItems = function () {

    app.db.getTaskListItems(app.selectedTimelineItemId, function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }


        var data = JSON.parse(result.data);
        if (data.length === 0) {
            $("#divTaskItems").empty();
            return;
        }


        // add items to tasklist
        $("#divTaskItems").loadTemplate($("#templateTaskListItem"), data);


        // set checkbox checked
        var items = $("#divTaskItems").find(".divTaskListItem");
        for (var i = 0; i < items.length; i++) {
            var cb = $(items[i]).find(".checkbox")[0];
            $(cb).checkboxX({threeState: false });
            if (data[i].completed == 1) {
                $(cb).prop("checked", true).trigger("change");
            }
        }


        // add keydown events to contenteditable elements
        $("#divTaskItems").find("[contenteditable='true']").keydown(function (e) {
            // save on enter
            if (e.which == 13) {
                e.preventDefault();
                var itemId = $(e.currentTarget)[0].id;
                var data = app.tasklist.getTaskListItemData(itemId);
                app.tasklist.updateTaskListItem(data.itemId, data.text, data.checked);
            }
        });


        // contenteditable focus events
        // return text to original if enter not pressed on contenteditable
        $("#divTaskItems").find("[contenteditable='true']").focus(function (e) {
            app.lastEditedText = e.target.innerHTML;
        });
        $("#divTaskItems").find("[contenteditable='true']").blur(function (e) {
            e.target.innerHTML = app.lastEditedText;
        });


        // checkbox click event
        $("#divTaskItems").find(".checkbox").on("change", function (e) {
            var data = app.tasklist.getTaskListItemData(e.currentTarget.id);
            app.tasklist.updateTaskListItem(data.itemId, data.text, data.checked);
        });


        // delete icon click event
        $("#divTaskItems").find("i.delete").click(function (e) {
            e.stopPropagation();
            app.tasklist.deleteTaskListItem(this.id);
        });
    });
}



// Update TaskList item
app.tasklist.updateTaskListItem = function (itemId, text, checked) {
    app.db.updateTaskListItem(app.selectedTimelineItemId, itemId, text, checked,
        function (result) {
            if (result.success === false) { app.ajaxError(result.data); return; }

            app.tasklist.getTaskListItems();
    });
}



// Delete TaskList item
app.tasklist.deleteTaskListItem = function (itemId) {
    app.db.deleteTaskListItem(itemId, function (result) {
        if (result.success === false) { app.ajaxError(result.data); return; }

        app.tasklist.getTaskListItems();
    });
}





// Create Multiple Tasklist Items
app.tasklist.createMultipleTaskItems = function () {
    $("#textareaDialog").val("");

    if ($("#divTimeline").find("li").length === 0) {
        alert("You need to create a Timeline Item first");
        return;
    }

    app.showDialog("Create Multiple Tasks",
        "Put each Task on a new line", false, true, function (result) {

            // if ok clicked on dialog, delete items
            if (result === true) {

                // split and remove blank items
                var items = $("#textareaDialog").val().split("\n");
                var actualItems = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].trim().length > 0) {
                        actualItems.push(items[i]);
                    }
                }

                if (actualItems.length > 0) {
                    app.db.createMultipleTaskListItems(app.selectedTimelineItemId,
                            actualItems, function () {
                        if (result.success === false) { app.ajaxError(result.data); return; }

                        app.tasklist.getTaskListItems();
                    })
                } else {
                    alert("No Items in Textbox");
                }
            }
        }
    );
}


// Delete All Tasklist Items
app.tasklist.deleteAllTaskItems = function () {

    if ($("#divTimeline").find("li").length === 0) {
        alert("Nothing to delete");
        return;
    }

    // ask before deleting
    app.showDialog("Delete All Tasks", "This will delete all Tasks on the selected Timeline Item",
                   false, false, function (result) {

            // if ok clicked on dialog, delete items
            if (result === true) {
                app.db.deleteAllTaskListItems(app.selectedTimelineItemId, function (result) {
                    if (result.success === false) { app.ajaxError(result.data); return; }

                    $("#divTaskItems").empty();
                });
            }
        }
    );
}














// *************************** Other things ***************************


// Set currently selected timeline item
app.tasklist.setSelectdTimelineItem = function (element) {

    $("#divTaskItems").empty();

    // find element if not provided
    if (!element) {
        var items = $("#divTimeline").find("li[id=" + app.selectedTimelineItemId + "]");

        if (items.length === 0) {
            // select first item if no match
            element = $("#divTimeline").find("li:first")[0];
        } else {
            element = items[0];
        }
    }

    if (element === undefined) return;

    app.selectedTimelineItemId = element.id;

    // remove all selections and set selected item color
    $("#divTimeline").find(".timeline-panel").removeClass("timeline-panel-selected");
    $(element).find(".timeline-panel").addClass("timeline-panel-selected");

    // get tasks for this item
    app.tasklist.getTaskListItems();
}



// get currently selected timeline item object
app.tasklist.getSelectedTimelineItem = function () {
    var items = $("#divTimeline").find("li[id=" + app.selectedTimelineItemId + "]");
    return items.length > 0 ? items[0] : null;
}



// get currently selected timeline item
app.tasklist.getSelectedTimelineItemData = function () {
    var item = app.tasklist.getSelectedTimelineItem();

    return {
        itemId: app.selectedTimelineItemId,
        title: $(item).find(".timeline-title")[0].innerHTML,
        text: $(item).find(".timeline-body > p")[0].innerHTML
    };
}



// get the values of a tasklist item
app.tasklist.getTaskListItemData = function (itemId) {
    var el = $("#divTaskItems").find(".divTaskListItem[id=" + itemId + "]");

    return {
        itemId: itemId,
        checked: $(el).find("input[type='checkbox']").is(":checked"),
        text: el.find("label")[0].innerHTML
    };
}
