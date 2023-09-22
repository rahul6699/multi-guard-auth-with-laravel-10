<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <title>{{ config('app.name', 'ForestTwin') }}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <script src="{{ asset('back/plugins/jquery/jquery.min.js') }}"></script>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    <script src="{{ asset('back/js/custom.js') }}" defer></script>
    <script>
        var BASE_URL = "<?= env('APP_URL') ?>";
    </script>
</head>
<body class="hold-transition login-page">
    @yield('content')
    @yield('page-js-script')
</body>
</html>
