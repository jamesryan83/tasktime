@extends('app')

@section('content')

<div id="divTaskListMain">

    <!-- headings -->
    <div id="divTaskListHeadings">

        <h2>Timeline</h2>

        <button id="buttonNewTimelineItem" class="btn btn-default" title="Create a new Timeline Item"
                onclick="app.tasklist.createNewTimelineItem()">
            <i class="fa fa-plus"></i>New</button>


        <h2 id="h2Tasks">Tasks</h2>

        <div id="divTaskInputs">
            <input type="text" id="inputTaskText"
                   class="form-control" autocomplete="off">

            <button class="btn btn-default" onclick="app.tasklist.createTaskListItem()"
                    title="Add a new Task to the selected Timeline Item">
                <i class="fa fa-plus"></i> Add Task
            </button>
        </div>

    </div>




    <div id="divTaskListContent">
        <!-- Timeline -->
        <div id="divTimeline">
        </div>

        <div class="arrow"></div>

        <!-- Tasklist -->
        <div id="divTaskList">

            <!-- Tasklist items -->
            <div id="divTaskItems">
            </div>

        </div>

        <div class="clearfix"></div>
    </div>



    <!-- templates -->

    <!-- timeline item template -->
    <!-- modified version of - http://bootsnipp.com/snippets/featured/timeline-responsive -->
    <script type="text/html" id="templateTimelineItem">
        <li data-id="id" onclick="app.tasklist.setSelectdTimelineItem(this)">

            <div class="timeline-badge">
                <i class="glyphicon glyphicon-align-left"></i>
            </div>

            <div class="timeline-panel">

                <div class="timeline-heading">
                    <h4 class="timeline-title" data-content="title" contenteditable="true"
                        data-id="id"></h4>

                    <i class="glyphicon glyphicon-remove delete" data-id="id"></i>

                    <p><small class="text-muted" data-content="created_at" data-id="id">
                        <i class="glyphicon glyphicon-time"></i></small></p>
                </div>

                <div class="timeline-body">
                    <p data-content="text" contenteditable="true"></p>
                </div>

            </div>
        </li>
    </script>


    <!-- task item template -->
    <script type="text/html" id="templateTaskListItem">
        <div class="divTaskListItem" data-id="id">
            <div class="elementLeft">
                <input class="checkbox" type="checkbox" data-id="id"/>
            </div>
            <div  class="elementMiddle">
                <label contenteditable="true" data-content="text" data-id="id"></label>
            </div>
            <div class="elementRight">
                <i class="glyphicon glyphicon-remove delete" data-id="id"
                    onclick="app.tasklist.deleteTaskListItem(this.id)"></i>
            </div>
            <div class="clearfix"></div>
        </div>
    </script>

</div>

@endsection
