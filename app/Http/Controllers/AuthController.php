<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    //
    public function signup(Request $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'user_name' => $request->user_name,
            'password' => Hash::make($request->new_password), // secure hash
            'product_id' => $request->id
        ]);

        // ✅ Auto-login (optional)
        auth()->login($user);

        return response()->json([
            'status' => true,
            'redirect' => '/dashboard'
        ]);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([
                'status' => true,
                'redirect' => '/dashboard'
            ]); // or home
        }else{
            return response()->json([
                'status' => true,
                'error' => 'Invalid'
            ]);
        }

        
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
                'status' => true,
            ]);
    }

    public function emailCheck(Request $request)
    {
        try {
            $email_exist = User::where('email', $request->email)->first();
            if ($email_exist) {
                return response()->json(['message' => 'Already exist', 'bool' => true]);
            } else {
                return response()->json(['message' => 'Verified', 'bool' => false]);
            }
        } catch (\Throwable $th) {
            return response()->json([['message' => 'Error occured', 'bool' => true]]);
        }
    }
    public function userNameCheck(Request $request)
    {
        try {
            $user_name_exist = User::where('user_name', $request->userName)->first();
            if ($user_name_exist) {
                return response()->json(['message' => 'Already exist', 'bool' => true]);
            } else {
                return response()->json(['message' => 'Verified', 'bool' => true]);
            }
        } catch (\Throwable $th) {
            return response()->json([['message' => 'Error occured', 'bool' => true]]);
        }
    }
}
