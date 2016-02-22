@extends('app')

@section('content')
<div id="divIndex">


    <!-- Heading -->
    <div id="divHeading">
<!--        <h1>Tasktime</h1>-->
        <img src="res/images/tasktime_logo.png" />
        <h3>A really simple task list program</h3>
    </div>


    <!-- Buttons -->
    <div id="divButtons">
        <button id="buttonLogin" class="btn btn-info"
                onclick="app.goToLoginScreen()">Login</button>
        <button id="buttonRegister" class="btn btn-success"
                onclick="app.goToRegisterScreen()">Register</button>
    </div>


    <!-- Image -->
    <div id="divImage">
        <div id="divImageText">
            <p><b>Tasktime</b> is an easy way to make a list of the day's tasks</p>
            <p>You create what are called <b>Timeline Items</b> to which you can add <b>Tasks</b></p>
            <p>Create as many Timeline Items as you want.  One per day, one per week, or whatever suits your workflow</p>
        </div>

        <img src="res/images/tasktime_main.png" width="80%" />
    </div>


    <!-- Contact -->
    <div id="divContact">
        <a href="mailto:james4165@hotmail.com?Subject=Tasktime">Contact</a>
    </div>

</div>
@endsection
