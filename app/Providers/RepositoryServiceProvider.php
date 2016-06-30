<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\MenuRepository::class, \App\Repositories\MenuRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\RolRepository::class, \App\Repositories\RolRepositoryEloquent::class);
        //:end-bindings:
    }
}
