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
            
            await api.get(`/products/${id}`)
                .then((res) => {
                    setProduct(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("Erro ao tentar requisitar produto: ", err)
                    navigate("/")
                    return;
                })
        }

        getProduct();
    }, [id])

    function handleAddCartItem(product: ProductsProps) {
        addItemCart(product)
        toast.success("Produto adicionado com sucesso!", {
            style: {
                backgroundColor: "#121212",
                color: "#fff"
            }
        })
        navigate("/cart")
    }

    if (loading || !product) {
        return (
            <div className="w-full max-w-7xl py-12 mx-auto flex flex-col justify-center items-center">
                <h4 className="text-2xl">Carregando detalhes...</h4>
            </div>
        )
    }

    return (
        <main className="w-full max-w-7xl px-4 mx-auto my-6">
            <section className="w-full">
                <div className="flex flex-col lg:flex-row">
                    <img
                        className="flex-1 w-full max-h-72 object-contain"
                        src={product?.cover}
                        alt={product?.title}
                    />
                    <div className="flex-1">
                        <h1 className="font-bold text-2xl mt-4 mb-2">{product?.title}</h1>
                        <p className="my-4">{product?.description}</p>
                        <div className="flex items-center gap-3">
                            <strong className="text-zinc-700/90 text-2xl">
                                {product?.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>
                            <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddCartItem(product)}>
                                <BsCartPlus size={20} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}