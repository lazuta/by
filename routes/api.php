<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/start-game', 'EventsController@game')->name('start');
Route::post('/save-throw', 'EventsController@throw');
Route::post('/game-over', 'EventsController@over');
Route::post('/in-flight', 'EventsController@flight');
Route::post('/bounce', 'EventsController@bounce');

