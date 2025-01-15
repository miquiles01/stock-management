"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const validEmail = "admin@gmail.com";
  const validPassword = "senha123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      router.push("/");
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-[#1B4332] mb-6">
          Bem-vindo!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Faça login para continuar.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1B4332] mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2725B] focus:border-transparent"
            placeholder="Digite seu email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#1B4332] mb-2">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2725B] focus:border-transparent"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#E2725B] text-white py-2 rounded-lg font-bold hover:bg-[#C2614A] transition-all"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
