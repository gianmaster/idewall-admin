<!DOCTYPE html>
<html lang="es">


@section('htmlheader')
	@include('layouts.partials.htmlheader')
@show


<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to get the
desired effect
|---------------------------------------------------------|
| SKINS         | skin-blue                               |
|               | skin-black                              |
|               | skin-purple                             |
|               | skin-yellow                             |
|               | skin-red                                |
|               | skin-green                              |
|---------------------------------------------------------|
|LAYOUT OPTIONS | fixed                                   |
|               | layout-boxed                            |
|               | layout-top-nav                          |
|               | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->

<body id="app" class="@{{ body_class }}">

@section('scripts')
    @include('layouts.partials.scripts')
    <!-- Main bundle vue app -->
    <script src="{{ asset('/js/build.js') }}" type="text/javascript"></script>
@show


</body>
</html>