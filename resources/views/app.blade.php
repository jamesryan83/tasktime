<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tasktime</title>

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css"
              rel='stylesheet' type='text/css'>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet">

        <link href="{{ URL::asset('lib/bootstrap-checkbox/css/checkbox-x.css') }}" rel="stylesheet">
        <link href="{{ URL::asset(elixir('css/app.css')) }}" rel="stylesheet">
        <link href="{{ URL::asset('favicon.ico') }}" rel="shortcut icon">
<!--        <link href="{{ URL::asset('css/app.css') }}" rel="stylesheet">-->


        <script src="{{ URL::asset('lib/jquery-2.1.4.js') }}"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="{{ URL::asset('lib/jquery-template.js') }}"></script>
        <script src="{{ URL::asset('lib/bootstrap-checkbox/js/checkbox-x.js') }}"></script>

        <script src="{{ URL::asset('js/index.js') }}"></script>
        <script src="{{ URL::asset('js/database.js') }}"></script>
        <script src="{{ URL::asset('js/tasklist.js') }}"></script>
        <script src="{{ URL::asset('js/util.js') }}"></script>
    </head>


    <body>

        <!-- Navbar -->
        <nav class="navbar navbar-default">
            <div class="container">

                <!-- Title -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="{{ url('/') }}">Tasktime</a>
                    <label id="labelLoading">Please Wait...</label>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">

                        <!-- Navbar Links -->
                        @if (Auth::guest())
                            <li><a href="{{ url('/login') }}">Login</a></li>
                            <li><a href="{{ url('/register') }}">Register</a></li>
                        @else
                            <ul class="nav navbar-nav">
                                <li><a href="{{ url('/tasklist') }}">My Tasks</a></li>
                                <li><a onclick="app.showHelp()">Help</a></li>
                                <li><a href="{{ url('/logout') }}">
                                        <i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        @endif
                    </ul>
                </div>

            </div>
        </nav>


        <!-- main div -->
        <div id="divContentArea">
            @yield('content')
        </div>



        <!-- dialog -->
        <div id="divDialogBackground">
            <div id="divDialog">
                <h2 id="h2Dialog"></h2>
                <p id="pDialog"></p>
                <button id="buttonDialogOk" class="btn btn-success">Ok</button>
                <button id="buttonDialogCancel" class="btn btn-danger">Cancel</button>
            </div>
        </div>


        <!-- help -->
        <div id="divHelpBackground">
            @include("help")
        </div>
    </body>
</html>
