<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductsRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $query = Products::select('id', 'name', 'image', 'buyingPrice', 'sellingPrice');
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        ;
        if ($request->has(key: 'buyingPrice')) {
            $query->where('buyingPrice', 'like', '%' . $request->buyingPrice . '%');
        }
        ;
        if ($request->has(key: 'sellingPrice')) {
            $query->where('sellingPrice', 'like', '%' . $request->sellingPrice . '%');
        }
        ;
        $products = $query->paginate(2);
        return inertia('Products/Index', [
            'products' => $products,
        ]);
    }
    public function create(ProductsRequest $request)
    {
        $product = new Products();
        $product->name = $request->name;
        $product->buyingPrice = $request->buyingPrice;
        $product->sellingPrice = $request->sellingPrice;
        $imagePath = $request->file('image')->store('productsImages', 'public');
        $product->image = $imagePath; // Save the image path
        $product->save();

        return redirect('dashboard')->with('success', 'Product added successfully');
    }
    public function edit($id)
    {
        $product = Products::findOrFail($id);
        return inertia('Products/Edit', compact('product'));// compact is for same representation

    }
    public function update(ProductUpdateRequest $request)
    {
        $item = Products::where('id', $request->id)->first();
        $item->name = $request->name;
        $item->buyingPrice = $request->buyingPrice;
        $item->sellingPrice = $request->sellingPrice;
        if ($request->has('image') && $request->image != null) {
            $imagePath = $request->file('image')->store('productsImages', 'public');
            $item->image = $imagePath;
        }
        $item->update();
        return redirect('products')->with('success', 'Product Edited Successfully');

    }
    public function show($id)
    {
        $product = Products::findOrFail($id);
        return inertia('Products/Show', compact('product'));
    }
}
