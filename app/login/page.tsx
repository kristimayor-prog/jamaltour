'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    if (data.session) {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">

      <div className="bg-black/40 p-8 rounded-xl border border-white/10 w-[360px]">

        <h1 className="text-2xl font-bold text-yellow-400 mb-6">
          Вход в админ-панель
        </h1>

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 bg-white/10 rounded outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Пароль"
          type="password"
          className="w-full p-3 mb-4 bg-white/10 rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300"
        >
          Войти
        </button>

      </div>

    </div>
  )
}