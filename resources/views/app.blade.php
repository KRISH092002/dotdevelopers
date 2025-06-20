@php
    $meta = $page['props']['product'] ?? [];

@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{ $meta['meta_title'] ?? 'Fallback Title' }}</title>
    <meta name="description" content="{{ $meta['meta_description'] ?? '' }}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

</head>

<body>
<div id='loader' class='fixed loader'>
    <div class="domino-loader">
        <div class="domino"></div>
        <div class="domino"></div>
        <div class="domino"></div>
        <div class="domino"></div>
        <div class="domino"></div>
    </div>
</div>
<div id="app" data-page="{{ json_encode($page) }}"></div>
    <script src="{{ mix('js/app.js') }}"></script>

</body>

</html>