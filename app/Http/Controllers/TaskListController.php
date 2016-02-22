<?php

namespace App\Http\Controllers;

use Log;
use Auth;
use DB;
use App\User;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


// Task List Controller
class TaskListController extends Controller
{

    // constructor
    public function __construct()
    {
        $this->middleware("auth");
    }




    // ****************************** Timeline Items ******************************


    // Create Timeline item
    public function createTimelineItem(Request $request)
    {
        DB::table("timeline_items")->insert([
            "user" => Auth::User()->id,
            "title" => "My Tasks",
            "text" => "",
            "icon" => "",
            "created_at" => $request->time,
            "updated_at" => $request->time
        ]);
    }


    // Get timeline items
    public function getTimelineItems()
    {
        $data = DB::table("timeline_items")->where("user", Auth::User()->id)
            ->orderBy("created_at", "desc")
            ->get();

        echo json_encode($data);
    }


    // Update Timeline item
    public function updateTimelineItem(Request $request)
    {
        DB::table("timeline_items")->where("id", $request->timelineItemId)->update([
            "title" => $request->title,
            "text" => $request->text,
            "updated_at" => $request->time
        ]);
    }


    // Delete Timeline item
    public function deleteTimelineItem(Request $request)
    {
        DB::table("timeline_items")->delete([
            "id" => $request->timelineItemId
        ]);

        DB::table("tasklist_items")->delete([
            "timeline_item_id" => $request->timelineItemId
        ]);
    }







    // ****************************** TaskList Items ******************************


    // Create Tasklist item
    public function createTaskListItem(Request $request)
    {
        // create task item
        DB::table("tasklist_items")->insert([
            "timeline_item_id" => $request->timelineItemId,
            "text" => $request->text,
            "completed" => false,
            "created_at" => $request->time,
            "updated_at" => $request->time
        ]);
    }


    // Get Tasklist items
    public function getTaskListItems(Request $request)
    {
        $items = DB::table("tasklist_items")
            ->where("timeline_item_id", $request->timelineItemId)
            ->orderBy("created_at")
            ->get();

        echo json_encode($items);
    }


    // Update Tasklist item
    public function updateTaskListItem(Request $request)
    {
        DB::table("tasklist_items")->where([
                ["timeline_item_id", $request->timelineItemId],
                ["id", $request->taskListItemId]
            ])->update([
                "text" => $request->text,
                "completed" => $request->checked,
                "updated_at" => $request->time
        ]);
    }


    // Delete Tasklist item
    public function deleteTaskListItem(Request $request)
    {
        $temp = DB::table("tasklist_items")->delete([
            "id" => $request->taskListItemId
        ]);
    }
}
