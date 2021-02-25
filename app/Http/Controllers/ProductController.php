<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('products', [
            'products' => Product::with(['type', 'category'])->get()->all(),
            'p_types' => ProductType::all(),
            'p_categories' => ProductCategory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'min:3',
                Rule::unique('products')
                    ->where('id_type', $request->id_type)
                    ->where('id_category', $request->id_category),
            ],
            'id_type' => ['required', 'numeric', 'gt:0'],
            'id_category' => ['required', 'numeric', 'gt:0'],
            'cost' => ['required', 'numeric', 'gt:0'],
            'price' => ['required', 'numeric', 'gt:0'],
        ]);

        $product = new Product($request->only(['name', 'id_type', 'id_category', 'description', 'cost', 'price']));
        $product->save();
        return Redirect::route('products.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validation = array();

        if ($request->name != $product->name || $request->id_type != $request->id_type || $product->id_category != $request->id_category) {
            return Redirect::route('products.index');
            $validation['name'] = [
                'required',
                'min:3',
                Rule::unique('products')
                    ->where('id_type', $request->id_type)
                    ->where('id_category', $request->id_category),
            ];
            $validation['id_type'] = ['required', 'numeric', 'gt:0'];
            $validation['id_category'] = ['required', 'numeric', 'gt:0'];
        }

        if ($request->cost != $product->cost || $request->price != $product->price) {
            $validation['cost'] = ['required', 'numeric', 'gt:0'];
            $validation['price'] = ['required', 'numeric', 'gt:0'];

        }

        if (count($validation) > 0 || $request->description != $product->description) {
            $product->update($request->only(['name', 'id_type', 'id_category', 'description', 'cost', 'price']));
        }
        return Redirect::route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}