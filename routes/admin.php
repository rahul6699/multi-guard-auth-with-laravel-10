<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\AdminController;

Route::group(['namespace'=>'Admin', 'prefix'=>'admin'],function(){
    Route::group(['middleware' => ['guest:admin','prevent-back-history'],'namespace'=>'Auth'],function(){
        
        Route::get('/login', [LoginController::class, 'showAdminLoginForm'])->name('admin.login');
        Route::get('/register', [RegisterController::class, 'showAdminRegisterForm'])->name('admin.register');
    
        Route::post('/login', [LoginController::class, 'adminLogin'])->name('admin.login');
        Route::post('/register', [RegisterController::class, 'createAdmin'])->name('admin.register');
    });

    Route::group(['middleware'=>['auth:admin','prevent-back-history']],function(){
        Route::get('/', [AdminController::class, 'index'])->name('admin');
        Route::post('/logout', [LoginController::class, 'logout'])->name('admin.logout');
    });
});