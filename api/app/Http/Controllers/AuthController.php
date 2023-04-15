<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateUserRequest;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful']);
        }

        return response()->json([
            'email' => 'The provided credentials do not match our records.',
        ], 401);
    }

    public function getAuthUser(Request $request)
    {
        return $request->user();
    }

    public function updateUser(UpdateUserRequest $request)
    {
        $request->validated();

        $user = User::find(Auth::id());
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->password)
            $user->password = Hash::make($request->password);

        $user->save();

        return new UserResource($user);
    }
}
