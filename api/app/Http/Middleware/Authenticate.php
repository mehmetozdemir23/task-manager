<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->guest()) {
                return $request->expectsJson()
                    ? response()->json(['error' => 'Unauthenticated'], 401)
                    : abort(403, 'Unauthorized');
            }
        }

        return $this->auth->shouldUse($guards[0]);
    }
}
