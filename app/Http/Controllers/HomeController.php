<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function storeProjects(Request $request){
        dd($request->all());
    }
}
