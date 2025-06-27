<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Password::defaults(function () {
            return Password::min(8)     // mínimo de 8 caracteres
                ->mixedCase() // letras maiúsculas e minúsculas
                ->letters()   // letras obrigatórias
                ->numbers()   // números obrigatórios
                ->symbols()   // símbolos obrigatórios
                ->uncompromised(); // verifica se a senha está em vazamentos públicos
        });
    }
}
