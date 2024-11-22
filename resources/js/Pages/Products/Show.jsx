import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Show({ auth, product }) {
    useEffect(() => {
        console.log(product);
    }, []);

    return (
        <Authenticated header={<h2 className="text-xl font-bold">Product Details</h2>}>
            <Head title={product.name} />
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h1>
                <img
                    src={`../../storage/${product.image}`}
                    alt={product.name}
                    className="w-full max-w-xs rounded-md shadow-md mx-auto mb-6"
                />
                <div className="mt-4">
                    <p className="text-gray-600 text-lg">
                        <span className="font-bold text-gray-800">Id:</span>{" "}
                        {product.id || "No description available."}
                    </p>
                    <p className="text-gray-600 text-lg mt-2">
                        <span className="font-bold text-gray-800">BuyingPrice:</span> ${product.buyingPrice}
                    </p>
                    <p className="text-gray-600 text-lg mt-2">
                        <span className="font-bold text-gray-800">SellingPrice:</span> {product.sellingPrice }
                    </p>
                </div>
                
            </div>
        </Authenticated>
    );
}
