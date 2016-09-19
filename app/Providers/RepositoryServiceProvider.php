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
        //$this->app->bind(\App\Repositories\RolsRepository::class, \App\Repositories\RolsRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\CatalogoRepository::class, \App\Repositories\CatalogoRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\CatalogoItemRepository::class, \App\Repositories\CatalogoItemRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\CicloRepository::class, \App\Repositories\CicloRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\MallaAcademicaRepository::class, \App\Repositories\MallaAcademicaRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\DocenteRepository::class, \App\Repositories\DocenteRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\MateriasCicloDocenteRepository::class, \App\Repositories\MateriasCicloDocenteRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\SilaboRepository::class, \App\Repositories\SilaboRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\JornadasSemestreRepository::class, \App\Repositories\JornadasSemestreRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\CicloDocentesRepository::class, \App\Repositories\CicloDocentesRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\HorariosCursosRepository::class, \App\Repositories\HorariosCursosRepositoryEloquent::class);
        //:end-bindings:
    }
}
