<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            \Log::info('Pristup odbijen: Korisnik nije prijavljen.');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $user = Auth::user();
        \Log::info('Korisnik je prijavljen:', ['email' => $user->email, 'role' => $user->role]);
    
        if ($user->role === 'admin') {
            return $next($request);
        }
    
        \Log::info('Pristup odbijen za korisnika: ' . $user->email);
        return response()->json(['message' => 'Access denied, admin only'], 403);
        
        //ispravljamo model jer u softverskoj klasi User.php nemamo role
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request); // dozvoli pristup
        }
        else {
            \Log::info('Pristup odbijen za korisnika: ' . Auth::user()->email);
            return response()->json(['message' => 'Access denied, admin only'], 403); 
        }
    }
}
