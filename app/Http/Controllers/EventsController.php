<?php

namespace App\Http\Controllers;

use App\Flight;
use App\Game;
use App\Http\Requests\BounceRequest;
use App\Http\Requests\FlightRequest;
use App\Http\Requests\GameRequest;
use App\Http\Requests\OverRequest;
use App\Http\Requests\ThrowRequest;
use App\ThrowBall;
use App\Over;
use App\Bounce;

class EventsController extends Controller
{
    public function game(GameRequest $request)
    {
        $game = Game::create([
            'username' => $request->username,
            'country_code' => $request->country_code,
        ]);

        return response()->json(['success' => true, 'game_id' => $game->id]);
    }

    public function throw(ThrowRequest $request)
    {
        $throw = ThrowBall::create([
            'game_id' => $request->game_id,
            'time' => date('Y-m-d H:i:s'),
            'angle' => $request->angle,
            'power' => $request->power,
        ]);

        return response()->json(['success' => true, 'throw_id' => $throw->id]);
    }

    public function over(OverRequest $request)
    {
        Over::create([
            'throw_id' => $request->throw_id,
            'time' => date('Y-m-d H:i:s'),
            'result' => $request->result,
        ]);

        return response()->json(['success' => true]);
    }

    public function flight(FlightRequest $request)
    {
        Flight::create([
            'throw_id' => $request->throw_id,
            'speed' => $request->speed,
            'x' => $request->x,
            'y' => $request->y,
        ]);

        return response()->json(['success' => true]);
    }

    public function bounce(BounceRequest $request)
    {
        Bounce::create([
            'throw_id' => $request->throw_id,
            'speed' => $request->speed,
            'x' => $request->x,
            'y' => $request->y,
        ]);

        return response()->json(['success' => true]);
    }
}
