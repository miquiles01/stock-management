"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Usando o useRouter para navegação

const EditProductPage = () => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query; // Pegando o ID da URL via router.query

  useEffect(() => {
    if (id) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const productToEdit = storedProducts.find((prod: any) => prod.id === id);
      if (productToEdit) {
        setProduct(productToEdit);
      }
    }
  }, [id]); // Recarrega quando o ID mudar

  const handleSave = () => {
    if (id && product) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedProducts = storedProducts.map((prod: any) =>
        prod.id === id ? { ...prod, ...product } : prod
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      router.push("/"); // Redireciona para a página principal após salvar
    }
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#E07A5F] mb-6">
          Editar Produto
        </h1>

        <div>
          <label>Nome</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-2 border mb-4"
          />
          <label>Quantidade</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            className="w-full p-2 border mb-4"
          />
          <label>Preço</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full p-2 border mb-4"
          />
          <label>Categoria</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full p-2 border mb-6"
          />
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition-all"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
