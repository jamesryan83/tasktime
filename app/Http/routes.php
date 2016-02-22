<?php


Route::group(['middleware' => 'web'], function () {

    Route::auth();

    Route::get("/", function () { return view("index"); });
    Route::get("/tasklist", function () { return view("tasklist"); });

    Route::post('/timeline-items', "TaskListController@createTimelineItem");
    Route::get('/timeline-items', "TaskListController@getTimelineItems");
    Route::put('/timeline-items', "TaskListController@updateTimelineItem");
    Route::delete('/timeline-items', "TaskListController@deleteTimelineItem");

    Route::post('/tasklist-items', "TaskListController@createTaskListItem");
    Route::get('/tasklist-items', "TaskListController@getTaskListItems");
    Route::put('/tasklist-items', "TaskListController@updateTaskListItem");
    Route::delete('/tasklist-items', "TaskListController@deleteTaskListItem");
});
