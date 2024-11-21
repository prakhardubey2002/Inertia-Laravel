<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductsRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $query=Products::select('id','name','image','buyingPrice','sellingPrice');
        if($request -> has('name')){
            $query-> where('name','like','%'. $request->name.'%' );
        };
        if($request -> has(key: 'buyingPrice')){
            $query-> where('buyingPrice','like','%'. $request->buyingPrice.'%' );
        };
        if($request -> has(key: 'sellingPrice')){
            $query-> where('sellingPrice','like','%'. $request->sellingPrice.'%' );
        };
        $products=$query->paginate(2);
        return inertia('Products/Index',[
            'products'=>$products,
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

}
