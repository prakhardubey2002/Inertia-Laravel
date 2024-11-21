<?php

namespace App\Http\Controllers;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function create(Request $request)
{
    // Validate the request
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'buyingPrice' => 'required|numeric',
        'sellingPrice' => 'required|numeric',
        'image' => 'required|file|image|mimes:jpeg,png,jpg,gif',
    ]);

    // Check if the file exists
    if (!$request->hasFile('image')) {
        return back()->withErrors(['image' => 'Image file is missing']);
    }

    // Store the file
    $imagePath = $request->file('image')->store('productsImages', 'public');

    // Create and save the product
    $product = new Products();
    $product->name = $request->name;
    $product->buyingPrice = $request->buyingPrice;
    $product->sellingPrice = $request->sellingPrice;
    $product->image = $imagePath; // Save the image path
    $product->save();

    return redirect('dashboard')->with('success', 'Product added successfully');
}

}
