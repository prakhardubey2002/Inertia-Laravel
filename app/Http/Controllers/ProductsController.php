<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductsRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
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

}
