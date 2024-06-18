import { Link } from "react-router-dom";

export function Notfound() {
    return (
        <div className="w-full max-w-7xl py-12 mx-auto flex flex-col justify-center items-center">
            <h1 className="text-6xl font-medium mt-6">Erro 404!</h1>
            <p className="text-2xl">Ops... Esta página não existe.</p>
            <Link
                to={"/"}
                className="font-semibold text-white cursor-pointer mt-8 border-0 py-1 px-3 rounded bg-gray-700"
            >
                Voltar a página Home
            </Link>
        </div>
    );
}
