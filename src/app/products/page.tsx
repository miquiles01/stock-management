"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  name: string;
  quantity: number;
  price: number;
  category: string;
  sold?: boolean;
  soldAt?: string[];
}

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const handleEdit = (index: number) => {
    router.push(`/edit/${index}`);
  };

  const handleRemove = (index: number) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este produto?"
    );
    if (confirmDelete) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  const marcarUnidadeComoVendida = (index: number) => {
    const atualizados = [...products];
    const produto = atualizados[index];

    if (produto.quantity > 0) {
      produto.quantity -= 1;
      if (!produto.soldAt) produto.soldAt = [];
      produto.soldAt.push(new Date().toISOString().split("T")[0]);

      if (produto.quantity === 0) {
        produto.sold = true;
      }

      setProducts(atualizados);
      localStorage.setItem("products", JSON.stringify(atualizados));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center text-[#48754B] mb-6">
          Listagem de Produtos
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-[#966850]">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-center">Produto</th>
                  <th className="px-4 py-2 border-b text-center">Quantidade</th>
                  <th className="px-4 py-2 border-b text-center">Preço</th>
                  <th className="px-4 py-2 border-b text-center">Categoria</th>
                  <th className="px-4 py-2 border-b text-center">Vendas</th>
                  <th className="px-4 py-2 border-b text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                    <td className="px-4 py-2 border-b">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2 border-b">{product.category}</td>
                    <td className="px-4 py-2 border-b">
                      {product.quantity > 0 ? (
                        <button
                          onClick={() => marcarUnidadeComoVendida(index)}
                          className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600"
                        >
                          Marcar como vendido
                        </button>
                      ) : (
                        <span className="text-green-600 font-semibold">Esgotado</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition-all text-sm mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition-all text-sm"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
