@extends('app')

@section('content')

<div id="divTaskListMain">

    <!-- headings -->
    <div id="divTaskListHeadings">

        <h2>Timeline</h2>

        <button id="buttonNewTimelineItem" class="btn btn-default"
                title="Create a new Timeline Item">
            <i class="fa fa-plus"></i>New</button>


        <h2 id="h2Tasks">Tasks</h2>


        <!-- create new task -->
        <div id="divTaskInputs">
            <input type="text" id="inputTaskText" class="form-control" autocomplete="off">

            <button id="buttonAddTaskItem" class="btn btn-default"
                    title="Add a new Task to the selected Timeline Item">
                <i class="fa fa-plus"></i> Add Task
            </button>

            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button"
                        id="dropdownMenuTasks" data-toggle="dropdown">
                    <span class="caret"></span>
                </button>
                
                <ul id="ulDropdownTasks" class="dropdown-menu dropdown-menu-right">
                    <li><a href="#">Create Multiple Tasks</a></li>
                    <li><a href="#">Delete All Tasks</a></li>
                </ul>
            </div>
        </div>

    </div>



    <!-- Main content -->
    <div id="divTaskListContent">

        <!-- Timeline -->
        <div id="divTimeline">
        </div>

        <div class="arrow"></div> <!-- arrow on top of timeline -->

        <!-- Tasklist -->
        <div id="divTaskList">
            <div id="divTaskItems"></div>
        </div>

        <div class="clearfix"></div>
    </div>



    <!-- templates -->

    <!-- timeline item template -->
    <!-- modified version of - http://bootsnipp.com/snippets/featured/timeline-responsive -->
    <script type="text/html" id="templateTimelineItem">
        <li data-id="id">

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
                <i class="glyphicon glyphicon-remove delete" data-id="id"></i>
            </div>
            <div class="clearfix"></div>
        </div>
    </script>

</div>

@endsection
