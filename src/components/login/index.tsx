'use client'

import { theme } from "@/theme";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const HandleSubmit = async (event: any) => {
        event.preventDefault();

        setError('');
        setLoading(true);
        if (email === "teste@exemplo.com" && password === "123") {
            setLoading(false);

            router.push('./home');
        } else {
            setLoading(false);
            setError("Email e/ou senha incorretos!");
        }
    };
    return (
        <div className="flex flex-col h-[100vh] w-full items-center justify-center lg:flex-row lg:h-[100vh]">
            <div className={`w-full ${theme.colors.bg[3]} h-[50%] flex flex-col items-center justify-center text-white lg:w-1/2 lg:h-full`}>
                <img src="/logo.png" alt="Logo Studio Saúde em Foco" className="w-3/5" />
            </div>
            <div className={`lg:w-1/2 h-screen lg:flex lg:flex-col items-center justify-center w-[80%] ${theme.colors.bg[6]}`}>
                <h2 className="text-2xl mb-6 mt-5 lg:mt-0 text-white font-bold">Login</h2>
                <form className="flex flex-col w-full items-center justify-center" onSubmit={HandleSubmit}>

                    <label className="self-start lg:ml-[25%] text-white font-bold" htmlFor="email">Email:</label>
                    <input
                        className="bg-[white] w-full h-10 rounded-md p-2 mb-5 lg:w-1/2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1BB0E3] transition-shadow duration-300"
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="self-start lg:ml-[25%] text-white font-bold" htmlFor="password">Senha:</label>
                    <input
                        className="bg-[white] w-full h-10 rounded-md p-2 mb-5 lg:w-1/2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1BB0E3] transition-shadow duration-300"
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="h-4">
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                    </div>

                    <button
                        className="btn btn-primary rounded text-white w-1/5 mt-5"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}