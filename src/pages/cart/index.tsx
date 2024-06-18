import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

    return (
        <div className="w-full max-w-7xl px-4 mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meu Carrinho</h1>

            {cart.length === 0 && (
                <div className="flex flex-col justify-center items-center">
                    <p className="font-medium">Ops o seu carrinho está vázio!</p>
                    <Link 
                        to={"/"}
                        className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"
                    >
                        Acessar Produtos
                    </Link>
                </div>
            )}
            {cart.map((item) => (
                <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300">
                    <img
                        className="w-28"
                        src={item.cover}
                        alt={item.title}
                    />
                    <strong>
                        Preço: {item.price}
                    </strong>

                    <div className="flex items-center justify-center gap-3">
                        <button 
                            className="bg-slate-600 text-white font-medium flex items-center justify-center px-2"
                            onClick={ () => removeItemCart(item) }
                        >
                            -
                        </button>
                        
                        {item.amount}

                        <button 
                            className="bg-slate-600 text-white font-medium flex items-center justify-center px-2"
                            onClick={ () => addItemCart(item) }
                        >
                            +
                        </button>
                    </div>

                    <strong className="float-right">
                        SubTotal: {item.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>

                </section>
            ))}
            {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
        </div>
    )
}