<?php

namespace App\Http\Controllers\products\billingApp;

use App\Http\Controllers\Controller;
use App\Models\services\Category;
use App\Models\services\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class BillingHomeController extends Controller
{
    //
    public function addNewProduct(Request $request)
    {
        $db_name = DB::connection('billing_mysql')->getDatabaseName();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => [
                'required',
                'string',
                'max:100',
                Rule::unique("billing_mysql.$db_name.products", 'sku'),
            ],
            'category_id' => 'required|integer|min:0',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|in:pcs,kg,ltr',
            'status' => 'boolean',
            'user_id' => 'required',
        ]);
        Products::create($validated);
        $products =   Category::select('id', 'category')->with('products')
            ->where('user_id', $request->user_id)
            ->where('status', 1)
            ->get()
            ->toArray();
        return response()->json(['products' => $products]);
    }

    public function getProducts(Request $request)
    {
        if (isset($request->order_by) && $request->order_by == 'category') {
            if (isset($request->user_id)) {
                $data =  Category::select('id', 'category')->with('products')
                    ->where('user_id', $request->user_id)
                    ->where('status', 1)
                    ->get()
                    ->toArray();
                return response()->json(['status' => true, 'products' => $data]);
            }
        } else {
            if (isset($request->user_id)) {
                $products = Products::where('user_id', $request->user_id)->get();
                return response()->json(['status' => true, 'products' => $products]);
            }
        }
    }
    public function addNewCategory(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'status' => 'boolean',
            'user_id' => 'required',
        ]);

        $categories = Category::create($validated);
        $products =   Category::select('id', 'category')->with('products')
            ->where('user_id', $request->user_id)
            ->where('status', 1)
            ->get()
            ->toArray();
        return response()->json(['categories' => $categories, 'products' => $products]);
    }

    public function getCategory(Request $request)
    {
        if (isset($request->user_id)) {
            $categories = Category::where('user_id', $request->user_id)->get();
            return response()->json(['status' => true, 'categories' => $categories]);
        }
    }
}
