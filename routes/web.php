<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' =>'prevent-back-history'], function () {
    Auth::routes();
});

Route::group(['middleware'=>['auth:web','prevent-back-history']],function(){
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
});