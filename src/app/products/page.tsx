"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  name: string;
  quantity: number;
  price: number;
  category: string;
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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center text-[#E07A5F] mb-6">
          Listagem de Produtos
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-[#966850]">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Nome</th>
                  <th className="px-4 py-2 border-b text-left">Quantidade</th>
                  <th className="px-4 py-2 border-b text-left">Preço</th>
                  <th className="px-4 py-2 border-b text-left">Categoria</th>
                  <th className="px-4 py-2 border-b text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                    <td className="px-4 py-2 border-b">{product.price}</td>
                    <td className="px-4 py-2 border-b">{product.category}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-400 transition-all text-sm sm:text-base"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all text-sm sm:text-base"
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
