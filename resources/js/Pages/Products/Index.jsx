import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import Pagination from "@/Components/Pagination";
export default function Index({ products }) {
    const auth = usePage().props.auth;
   
    const { data, setData,get,delete:destroy } = useForm({
        page: products.current_page,
        name: "",
        buyingPrice: "",
        sellingPrice: "",
    });
    const handleDelete=(productId)=> {
        if(confirm("Are You sure you want to delete?")){
            destroy(`/products/delete/${productId}`)
        }
    }
    const handleFilterChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    useEffect(()=>{
        const timeoutId=setTimeout(() => {
            get('products',{
                preserveState:true,
                name:data.name,
                buyingPrice:data.buyingPrice,
                sellingPrice:data.sellingPrice,
                page:data.page,
            })
        }, 300);
        return ()=>clearTimeout(timeoutId)
    },[data])
    console.log(products)
    return (
        <Authenticated user={auth.user} header={<h2>Products </h2>}>
            <Head title="Products" />
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>
                            <label> Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleFilterChange}
                                placeholder="Filter by name"
                            />
                        </th>
                        <th>
                            <label> Buying price</label>
                            <input
                                type="text"
                                name="buyingPrice"
                                value={data.buyingPrice}
                                onChange={handleFilterChange}
                                placeholder="Filter by buyingPrice"
                            />
                        </th>
                        <th>
                            <label>Selling Price</label>
                            <input
                                type="text"
                                name="sellingPrice"
                                value={data.sellingPrice}
                                onChange={handleFilterChange}
                                placeholder="Filter by sellingPrice"
                            />
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={`storage/${product.image}`}
                                    style={{ width: "180px" }}
                                    title={product.name}
                                />{" "}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.buyingPrice}</td>
                            <td>{product.sellingPrice}</td>
                            <td>
                                <Link
                                    href={"products/edit/" + product.id}
                                    className="btn btn-success"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                <Link
                                    href={"products/show/" + product.id}
                                    className="btn btn-info"
                                >
                                    {" "}
                                    Show
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                links={products.links}
                currentPage={products.currentPage}
                setCurrentPage={(page) => setData("page", page)}
            />
        </Authenticated>
    );
}
