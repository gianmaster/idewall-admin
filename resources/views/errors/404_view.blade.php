<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>404 - Page not found</title>
    <link href="{{ asset('/css/AdminLTE.css') }}" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container">
        <div class="error-page">
            <h2 class="headline text-yellow"> 404</h2>
            <div class="error-content">
                <h3><i class="fa fa-warning text-yellow"></i> Oops! {{ trans('adminlte_lang::message.pagenotfound') }}.</h3>
                <p>
                    {{ trans('adminlte_lang::message.notfindpage') }}
                    {{ trans('adminlte_lang::message.mainwhile') }} <a href='{{ url('/home') }}'>{{ trans('adminlte_lang::message.returndashboard') }}</a> {{ trans('adminlte_lang::message.usingsearch') }}
                </p>
                <form class='search-form'>
                    <div class='input-group'>
                        <h1>PAGE NOT FOUND</h1>
                        <p>:(</p>
                    </div><!-- /.input-group -->
                </form>
            </div><!-- /.error-content -->
        </div><!-- /.error-page -->
    </div>
</body>
</html>