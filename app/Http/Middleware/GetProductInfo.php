<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GetProductInfo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $domain = $request->getHost();
        $product_info = Product::where('product_domain' , $domain)->first();
        if($product_info){
            $product_info = $product_info->toArray();
        }else{
            $product_info = [];
        }

        $request->merge($product_info);

        return $next($request);
    }
}
