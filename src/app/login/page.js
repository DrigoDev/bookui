'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const router = useRouter()

    function handleLogin(e) {
        e.preventDefault()
        if (user === 'admin' && pass === '123') {
            localStorage.setItem('auth', 'true')
            router.push('/dashboard')
        } else {
            alert('Usuário ou senha inválidos')
        }
    }

    return (
        <div>
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-80"
            >
                <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
                <input
                    type="text"
                    placeholder="Usuário"
                    className="border p-2 w-full mb-3 rounded"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="border p-2 w-full mb-4 rounded"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}