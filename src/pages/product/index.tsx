import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";

import { ProductsProps } from "../home";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";


export function Product() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductsProps>()
    const navigate = useNavigate();

    const { addItemCart } = useContext(CartContext)

    useEffect(() => {
        async function getProduct() {
            
            const response = await api.get(`/products/${id}`);
            
            if(response.statusText === "Not Found") {
                console.log("entrou no if")
                navigate("/")
                return;
            }

            setProduct(response.data)
            setLoading(false)
        }

        getProduct();
    }, [])

    function handleAddCartItem(product: ProductsProps) {
        addItemCart(product)
        toast.success("Produto adicionado com sucesso!", {
            style: {
                backgroundColor: "#121212",
                color: "#fff"
            }
        })
    }

    if (loading || !product) {
        return (
            <div className="w-full max-w-7xl py-12 mx-auto flex flex-col justify-center items-center">
                <h4 className="text-2xl">Carregando detalhes...</h4>
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-7xl px-4 mx-auto">
            <div className="w-full flex justify-between mt-12 gap-6" key={product.id}>
                <img
                    className="w-2/6 rounded-lg max-h-70 mb-2"
                    src={product.cover}
                    alt={product.title}
                />
                <section className="flex flex-col mt-12">
                    <h1 className="font-medium mt-1 mb-2">
                        {product.title}
                    </h1>
                    <p className="max-w-2xl">
                        {product.description}
                    </p>

                    <div className="flex gap-3 items-center">
                        <strong className="text-zinc-700/90 text-2xl">
                            {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </strong>
                        <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddCartItem(product)}>
                            <BsCartPlus size={20} color="#fff" />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}