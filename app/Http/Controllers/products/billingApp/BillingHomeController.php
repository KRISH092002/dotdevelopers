<?php

namespace App\Http\Controllers\products\billingApp;

use App\Http\Controllers\Controller;
use App\Models\services\billingapp\Customer;
use App\Models\services\billingapp\Invoice;
use App\Models\services\Category;
use App\Models\services\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Vinkla\Hashids\Facades\Hashids ;

class BillingHomeController extends Controller
{
    //
    
    public function previewInvoice(Request $request)
    {        
        $invoice = Invoice::select('id', 'invoice_json as items','customer_id', 'payment_mode', 'total_amt', 'created_at')->with('customer')->where('user_id', $request->user()->id)->where('id', Hashids::decode($request->id)[0])->first();
        return Inertia::render('BillingApp/BillingAppComponents/billPage', [
            'invoice' => isset($invoice) ? $invoice: null
        ]);
    }
    public function getInvoices(Request $request)
    {
        if (isset($request->user()->id)) {
            if ($request->typw === 'pending') {
                $invoices = Invoice::select('id', 'customer_id', 'payment_mode', 'total_amt', 'created_at')->with('customer')->where('user_id', $request->user()->id)->where('payment_mode', 'pending')->get();
            } else {
                $invoices = Invoice::select('id', 'customer_id', 'payment_mode', 'total_amt', 'created_at')->with('customer')->where('user_id', $request->user()->id)->get();
            }
            return   response()->json(['status' => true, 'invoices' =>  $invoices]);
        }
    }
    public function addNewInvoice(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required',
            'customer_id' => 'required',
            'invoice_json' => 'required',
            'payment_mode' => 'required',
            'total_amt' => 'required',
        ]);

        $invoice = Invoice::create($validated);
        return response()->json(['status' => true, 'invoice_id' => $invoice->id]);
    }
    public function getClients(Request $request)
    {
        if (isset($request->user()->id)) {
            $clients = Customer::where('user_id', $request->user()->id)->get();
            return   response()->json(['status' => true, 'clients' =>  $clients]);
        }
    }
    public function addNewClient(Request $request)
    {
        $db_name = DB::connection('billing_mysql')->getDatabaseName();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'max:100',
                Rule::unique("billing_mysql.$db_name.customers", 'email'),
            ],
            'phone' => [
                'required',
                'string',
                'max:100',
                Rule::unique("billing_mysql.$db_name.customers", 'phone'),
            ],
            'address' => 'required|string|max:255',
            'user_id' => 'required',
        ]);
        Customer::create($validated);
        return response()->json(['status' => true]);
    }
    public function openDashboard(Request $request)
    {
        $getProducts = $this->getProducts($request);
        return Inertia::render('BillingApp/dashboard', [
            'user' => auth()->user(),
            'products' => isset($getProducts) ? $getProducts->toArray() : [],
            'clients' => isset($getClients) ? $getClients->toArray() : []
        ]);
    }
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
            if (isset($request->user()->id)) {
                $products = Products::where('user_id', $request->user()->id)->where('status', 1)->get();
                return  $products;
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
            $categories = Category::where('user_id', $request->user_id)->where('status', 1)->get();
            return response()->json(['status' => true, 'categories' => $categories]);
        }
    }
}
