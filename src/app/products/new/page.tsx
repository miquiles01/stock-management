'use client';

import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const NewProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "quantity" || name === "price") {
      const numericValue = value === "" ? "" : parseFloat(value).toString();
      setProduct({ ...product, [name]: numericValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveToLocalStorage(product);
    console.log("Produto cadastrado:", product);
    toast.success("Produto cadastrado com sucesso!"); 
    
    // Limpando o formulário após o envio
    setProduct({
      name: "",
      quantity: "",
      price: "",
      category: "",
    });
  };

  const saveToLocalStorage = (newProduct: typeof product) => {
    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center text-[#48754B] mb-6">Cadastrar Produto</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition-all"
              placeholder="Digite o nome do produto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition-all"
              placeholder="Quantidade disponível"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition-all"
              placeholder="Preço do produto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition-all"
              placeholder="Categoria do produto"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3F4B38] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#48754B] transition-all"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewProductPage;
